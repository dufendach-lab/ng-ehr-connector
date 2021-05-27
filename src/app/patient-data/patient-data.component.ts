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
  socialBundle: Subject<Bundle | Observation> = new Subject();
  labBundle: Subject<Bundle | Observation> = new Subject();
  medBundle: Subject<Bundle | Observation> = new Subject();
  immuneBundle: Subject<Bundle | Observation> = new Subject();
  conditionBundle: Subject<Bundle | Observation> = new Subject();
  procedureBundle: Subject<Bundle | Observation> = new Subject();
  documentBundle: Subject<Bundle | Observation> = new Subject();

  task: Task = {
    name: 'Authorize All',
    completed: false,
    subtasks: [
      {name: 'vitals', completed: false, subtasks: []},
      {name: 'socials', completed: false, subtasks: []},
      {name: 'labs', completed: false, subtasks: []},
      {name: 'meds', completed: false, subtasks: []},
      {name: 'immune', completed: false, subtasks: []},
      {name: 'condition', completed: false, subtasks: []},
      {name: 'procedure', completed: false, subtasks: []},
      {name: 'document', completed: false, subtasks: []}
    ]
  };



  constructor(private obsService: ObservationService) {

  }

  ngOnInit(): void {
    this.obsService.getObservationByCategory("vital-signs").then(b => this.vitalsBundle.next(b));
    this.obsService.getObservationByCategory("social-history").then(b => this.socialBundle.next(b));
    this.obsService.getObservationByCategory("laboratory").then(b => this.labBundle.next(b));
    this.obsService.getMedStatement().then(b => this.medBundle.next(b));
    this.obsService.getImmunization().then(b => this.immuneBundle.next(b));
    this.obsService.getConditions().then(b => this.conditionBundle.next(b));
    this.obsService.getProcedures().then(b => this.procedureBundle.next(b));
    this.obsService.getDocuments().then(b => this.documentBundle.next(b));
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
    console.log(this.vitalsBundle);
    console.log(this.socialBundle);
    console.log(this.labBundle);
    console.log(this.medBundle);
    console.log(this.procedureBundle);
    console.log(this.immuneBundle);
    console.log(this.conditionBundle);
    console.log(this.documentBundle);
  }
}
