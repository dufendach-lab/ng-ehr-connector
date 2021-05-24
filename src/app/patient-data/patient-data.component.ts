import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import {FormControl} from '@angular/forms';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Categories {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  ptData = new FormControl('29463-7');
  formValue = new FormControl('vital-signs');

  obsBundle: Subject<Bundle | Observation> = new Subject();

  categories: Categories[] = [
    {value: 'social-history', viewValue: 'Social History'},
    {value: 'vital-signs', viewValue: 'Vital Signs'},
    {value: 'imaging', viewValue: 'Imaging'},
    {value: 'laboratory', viewValue: 'Laboratory'},
    {value: 'procedure', viewValue: 'Procedure'},
    {value: 'survey', viewValue: 'Survey'},
    {value: 'exam', viewValue: 'Exam'},
    {value: 'therapy', viewValue: 'Therapy'},
    {value: 'activity', viewValue: 'Activity'},
  ];

  // obsBundle: Subject<Bundle | Observation> = new Subject();

  constructor(private obsService: ObservationService) {
  }

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

}
