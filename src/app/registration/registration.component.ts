import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import {IRegistration} from '../../Interfaces/IRegistration';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  passwordsMatch = true;
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
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    MotherDoB: ['', Validators.required],
    EstDueDate: ['', Validators.required],
    Diagnosis: ['', Validators.required],
    Hospital: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private router: Router,
    private regService: RegistrationService) {
  }

  //Uses the Endpoints function to retrieve a list of all the available epic endpoints
  getHospitalList() {
    this.hospitalOptions = this.fhirService.fhirEndpoints.map(v => v.OrganizationName);
    return
  }

  //Obtains the list of hospitals, then watches the hospital field value to update list as auto complete occurs
  ngOnInit(): void {
    this.getHospitalList();
    this.hospitalList = this.registration.controls['Hospital'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  //Logs the patients registraion data
  submit() {
    if(this.registration.controls['password1'].value === this.registration.controls['password2'].value){
      this.registrationInfo.hospital = this.selectedHospitals;
      try{
        this.regService.createPatient(this.registrationInfo, this.registration.controls['email'].value, this.registration.controls['password1'].value).then((result) =>{
          console.log(result)
          if(result === false){
            this.EmailInUse = true;
          }
        })
        console.log("Wrong block");
      }
      catch(e){
        console.log("Correct Block")
        this.EmailInUse = true;
        console.log(e);
      }
    }
    else{
      this.passwordsMatch = false;
    }
    console.log(this.EmailInUse)
    // this.router.navigateByUrl('/m/landing');
  }

  pageChange(){
    this.isPage2 = !this.isPage2;
    if(this.isPage2 == false){
      this.pageButtonText = "Next Page";
    }
    else{
      this.pageButtonText = "Previous Page";
    }
  }

  onLogin(){

  }
  //Add a chip to the hosipital selection
  addChip(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      //Clear validation to enusre form can be submitted since at least 1 hospital was selected
      this.registration.controls['Hospital'].clearValidators();
      if ((value || '').trim()) {
        this.registrationInfo.hospital.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.registration.controls['Hospital'].setValue(null);
      this.ngOnInit();
    }
  }

  //Allows for a chip to removed
  removeChip(hos: string) {
    const index = this.selectedHospitals.indexOf(hos);
    if (index >= 0) {
      this.selectedHospitals.splice(index, 1);
      //If this is the last chip left, the validator is renable to ensure that a hospital is selected
      if (this.selectedHospitals.length == 0) {
        this.registration.controls['Hospital'].setValidators([Validators.required]);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedHospitals.push(event.option.viewValue);
    this.hospitalInput.nativeElement.value = '';
    this.registration.controls['Hospital'].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.hospitalOptions.filter(hospitalOptions => hospitalOptions.toLowerCase().includes(filterValue));
  }
}
