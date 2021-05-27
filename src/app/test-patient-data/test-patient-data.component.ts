import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import {FormControl} from '@angular/forms';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-test-patient-data',
  templateUrl: './test-patient-data.component.html',
  styleUrls: ['./test-patient-data.component.scss']
})
export class TestPatientDataComponent implements OnInit {

  ptData = new FormControl('29463-7');
  formValue = new FormControl('vital-signs');
  formValue2 = new FormControl('medstatement');

  obsBundle: Subject<Bundle | Observation> = new Subject();

  categories: Categories[] = [
    {value: 'social-history', viewValue: 'Social History'},
    {value: 'vital-signs', viewValue: 'Vital Signs'},
    {value: 'laboratory', viewValue: 'Laboratory'}
  ];

  information: Categories[] = [
    {value: 'medstatement', viewValue: 'Medical Statement'},
    {value: 'immunization', viewValue: 'Immunization'},
    {value: 'conditions', viewValue: 'Conditions'},
    {value: 'procedures', viewValue: 'Procedures'},
    {value: 'documents', viewValue: 'Documents'}
  ];

  constructor(private obsService: ObservationService) { }

  ngOnInit(): void {
  }

  // Search function
  search(): void {
    const code = this.ptData.value;
    if (code) {
      console.log(`getting code ${code}`);
      this.obsService.getObservation(code).then(b => {
        console.log('value returned:');
        console.log(b);
        this.obsBundle.next(b);
      });
    }
  }

  searchByCategory(): void {
    const category = this.formValue.value;
    if (category) {
      this.obsService.getObservationByCategory(category).then(b => this.obsBundle.next(b));
    }
  }

  searchByMedStatement(): void {
    this.obsService.getMedStatement().then(b => this.obsBundle.next(b));
  }

  searchByImmunization(): void {
    this.obsService.getImmunization().then(b => this.obsBundle.next(b));
  }

  searchByConditions(): void {
    this.obsService.getConditions().then(b => this.obsBundle.next(b));
  }

  searchByProcedures(): void {
    this.obsService.getProcedures().then(b => this.obsBundle.next(b));
  }

  searchByDocuments(): void {
    this.obsService.getDocuments().then(b => this.obsBundle.next(b));
  }

  // Utility function
  selectedSearch(): void {
    const option = this.formValue2.value;
    switch (option) {
      case "medstatement":
        this.searchByMedStatement();
        break;

      case "immunization":
        this.searchByImmunization();
        break;

      case "conditions":
        this.searchByConditions();
        break;

      case "procedures":
        this.searchByProcedures();
        break;

      case "documents":
        this.searchByDocuments();
        break;

      default:
        break;
    }
  }

}
