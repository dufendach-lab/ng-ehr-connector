import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import {IRegistration} from '../../Interfaces/IRegistration';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
  })

  constructor(private fb: FormBuilder, private fhirService: FhirAuthService) {
  }

  //Uses the Engpoints function to retrieve a list of all the available epic endpoints
  getHospitalList() {
    this.hospitalOptions = this.fhirService.fhirEndpoints.map(v => v.OrganizationName);
    return //this.fhirService.fhirEndpoints.map(v => v.OrganizationName);

    // const res = this.fhirService.fhirEndpoints;
    // this.hospitalOptions = [];
    // res.forEach(hos => {
    //   this.hospitalOptions.push(hos.OrganizationName);
    // });
  }

  //Obtains the list of hospitals, then watches the hospital field value to update list as autoomplete occurs
  ngOnInit(): void {
    this.getHospitalList();
    this.hospitalList = this.registration.controls['Hospital'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  //Logs the patients registraion data
  submit() {
    this.registrationInfo.hospital = this.selectedHospitals;
    console.log(this.registrationInfo)
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
