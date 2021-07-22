import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {FhirAuthService} from "../fhir-auth.service";
import {IRegistration} from '../../Interfaces/IRegistration';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  passwordsMatch = true;
  privacyPolicy = false;
  isPage2 = false;
  pageButtonText = "Next Page";
  EmailInUse = false;
  hide1 = true;
  hide2 = true;
  //Hospital list, that updates as autocomplete occurs
  hospitalList: Observable<string[]> | any;
  hospitalOptions: string[] = []

  //Initializes a new interface to store the data
  registrationInfo = {} as IRegistration;

  //Hoispital selected for the chips seen
  selectedHospitals: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('hospitalInput') hospitalInput = {} as ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete = {} as MatAutocomplete;

  //The formbuilder reactive form
  registration = this.fb.group({
    firstname: ['' , Validators.required],
    lastname: ['', Validators.required],
    MotherDoB: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private router: Router,
    private regService: RegistrationService,
    private dialog: MatDialog) {
  }

  //Uses the Endpoints function to retrieve a list of all the available epic endpoints
  getHospitalList() {
    this.hospitalOptions = this.fhirService.fhirEndpoints.map(v => v.OrganizationName);
    return
  }

  //Obtains the list of hospitals, then watches the hospital field value to update list as auto complete occurs
  ngOnInit(): void {

  }

  //Logs the patients registraion data
  submit() {
    if(this.registration.controls['password1'].value === this.registration.controls['password2'].value){
      try{
        this.regService.createPatient(this.registration.controls['email'].value, this.registration.controls['password1'].value).then((result) =>{
          console.log(result)
          if(result === false){
            this.EmailInUse = true;
          }
          else{
            this.registrationInfo.phone = ("+1" + this.registrationInfo.phone);
            this.registrationInfo.role = "User";
            this.regService.createPatientInfo(this.registrationInfo)
          }
        })
      }
      catch(e){
        this.EmailInUse = true;
      }
    }
    else{
      this.passwordsMatch = false;
    }
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(PrivacyDialogComponent, {
      width: '40%',
      data: { privacyPolicy: this.privacyPolicy }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.privacyPolicy = result;
      if(this.privacyPolicy){
        this.submit();
      }
    });
  }
}
