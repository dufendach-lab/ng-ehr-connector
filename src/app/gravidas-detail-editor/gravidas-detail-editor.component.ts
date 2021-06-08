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
import { IGravidasDetails } from '../../Interfaces/IGravidasDetails'

@Component({
  selector: 'app-gravidas-detail-editor',
  templateUrl: './gravidas-detail-editor.component.html',
  styleUrls: ['./gravidas-detail-editor.component.scss']
})
export class GravidasDetailEditorComponent implements OnInit {

  firstDetail = true;
  hospitalList: Observable<string[]> | any;
  hospitalOptions: string[] = []

  //Initializes a new interface to store the data
  registrationInfo = {} as IRegistration;
  gravidasDetails = {} as IGravidasDetails;

  //Hoispital selected for the chips seen
  selectedHospitals: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('hospitalInput') hospitalInput = {} as ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete = {} as MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private router: Router,
    private regService: RegistrationService
  ) { }

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

  registration = this.fb.group({
    // firstname: [''],
    // lastname: [''],
    // MotherDoB: [''],
    EstDueDate: ['', Validators.required],
    Diagnosis: ['', Validators.required],
    Hospital: ['', Validators.required],
    Parity: ['', Validators.required],
  })

  submit() {
    this.gravidasDetails.hospital = this.selectedHospitals;
    this.regService.createGravidas(this.gravidasDetails);

    this.router.navigateByUrl('/landing');
  }

  addChip(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      //Clear validation to enusre form can be submitted since at least 1 hospital was selected
      this.registration.controls['Hospital'].clearValidators();
      if ((value || '').trim()) {
        this.gravidasDetails.hospital.push(value.trim());
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
