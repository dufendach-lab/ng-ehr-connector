import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import { IRegistration } from '../../Interfaces/IRegistration';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  selectedHospitals: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('hospitalInput') hospitalInput = {} as ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete = {} as MatAutocomplete;

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
    this.hospitalOptions = [];
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
    this.registrationInfo.hospital = this.selectedHospitals;
    console.log(this.registrationInfo)
    console.log("FB info");
    console.log(this.registration.value);
  }


  //Stuff required for the chips
  addChip(event: MatChipInputEvent){
    if(!this.matAutocomplete.isOpen){
    const input = event.input;
    const value = event.value;
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

  removeChip(hos: string){
    const index = this.selectedHospitals.indexOf(hos);
    if(index >= 0){
      this.selectedHospitals.splice(index, 1);
      if(this.selectedHospitals.length == 0){
        this.registration.controls['Hospital'].setValidators([Validators.required]);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedHospitals.push(event.option.viewValue);
    this.hospitalInput.nativeElement.value = '';
    this.registration.controls['Hospital'].setValue(null);
  }
}
