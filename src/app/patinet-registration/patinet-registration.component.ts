import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { FhirAuthService } from '../fhir-auth.service';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-patinet-registration',
  templateUrl: './patinet-registration.component.html',
  styleUrls: ['./patinet-registration.component.scss']
})
export class PatinetRegistrationComponent implements OnInit {
  passwordsMatch = true;
  privacyPolicy = false;
  isPage2 = false;
  pageButtonText = "Next Page";
  EmailInUse = false;
  hide1 = true;
  hide2 = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  //Initializes a new interface to store the data
  registrationInfo = {} as IRegistration;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  //The formbuilder reactive form
  registration = this.fb.group({
    firstname: ['' , Validators.required],
    lastname: ['', Validators.required],
    MotherDoB: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private router: Router,
    private regService: RegistrationService,
    public dialog: MatDialog
  ) { }

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
