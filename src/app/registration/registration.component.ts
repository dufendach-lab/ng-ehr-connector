import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import { IRegistration } from '../../Interfaces/iregistration';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor( private fb: FormBuilder, private fhirService: FhirAuthService) { }

  hospitalList: Observable<string[]> | any;
  hospitalOptions: string[] = []
  registrationInfo = {} as IRegistration;

  // @ViewChild('hospitalInput') hospitalInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;

  //registration = new FormControl();
  registration = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    MotherDoB: ['', Validators.required],
    EstDueDate: ['', Validators.required],
    Diagnosis: ['', Validators.required],
    Hospital: ['', Validators.required],
  })

  //Save as an interface

  getHospitalList(){
    const res = this.fhirService.getEndpoints();
    res.forEach(hos => {
      this.hospitalOptions.push(hos.OrganizationName);
    });
  }

  ngOnInit(): void {
    this.getHospitalList();
    this.hospitalList = this.registration.controls['Hospital'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.hospitalOptions.filter(hospitalOptions => hospitalOptions.toLowerCase().includes(filterValue));
  }

  submit() {
    console.log("Interface Info")
    console.log(this.registrationInfo)
    console.log("FB info");
    console.log(this.registration.value);
  }


  //Stuff required for the chips
  addChip(event: MatChipInputEvent){

  }
  removeChip(hos: string){
    const index = this.registrationInfo.Hospital.indexOf(hos);

    if(index >= 0){
      this.registrationInfo.Hospital.splice(index, 1);
    }
  }
}
