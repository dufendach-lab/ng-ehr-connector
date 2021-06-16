import {Component, OnInit} from '@angular/core';
import {forkJoin, Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import {FormControl} from '@angular/forms';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

interface Categories {
  value: string;
  viewValue: string;
}

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

  task: Task = {
    name: 'Authorize All',
    completed: true,
    subtasks: [
      {name: 'vitals', completed: true, subtasks: []},
      {name: 'labs', completed: true, subtasks: []},
      {name: 'meds', completed: true, subtasks: []},
      {name: 'condition', completed: true, subtasks: []},
      {name: 'procedure', completed: true, subtasks: []},
    ]
  };



  constructor(private obsService: ObservationService) {

  }

  ngOnInit(): void {
    this.obsService.getObservationByCategory("vital-signs").then(b => this.vitalsBundle.next(b));;
    this.obsService.getObservationByCategory("laboratory").then(b => this.labBundle.next(b));
    this.obsService.getData('MedicationStatement').then(b => this.medBundle.next(b));
    this.obsService.getData('Condition').then(b => this.conditionBundle.next(b));
    this.obsService.getData('Procedure').then(b => this.procedureBundle.next(b));
    this.obsService.getObservation().then(b => this.testBundle.next(b));
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  submitData(): void {
  }
}
