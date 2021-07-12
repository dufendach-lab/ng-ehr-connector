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
}
