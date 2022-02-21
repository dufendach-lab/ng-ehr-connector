import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Task {
  name: string;
  completed: boolean;
  subtasks: Task[];
}

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  vitalsBundle: Subject<Bundle | Observation> = new Subject();
  labBundle: Subject<Bundle | Observation> = new Subject();
  medBundle: Subject<Bundle | Observation> = new Subject();
  conditionBundle: Subject<Bundle | Observation> = new Subject();
  procedureBundle: Subject<Bundle | Observation> = new Subject();

  testBundle: Subject<Bundle | Observation> = new Subject();

  constructor(private obsService: ObservationService) {

  }

  ngOnInit(): void { // Calls to grab data from EHR
    this.obsService.getObservationByCategory("vital-signs").then(b => this.vitalsBundle.next(b));
    this.obsService.getObservationByCategory("laboratory").then(b => this.labBundle.next(b));
    this.obsService.getData('MedicationStatement').then(b => this.medBundle.next(b));
    this.obsService.getData('Condition').then(b => this.conditionBundle.next(b));
    this.obsService.getData('Procedure').then(b => this.procedureBundle.next(b));
    // this.obsService.getObservation().then(b => this.testBundle.next(b)); THIS STATEMENT USED FOR LOINC TESTING
  }

  submitData(): void {
  }
}
