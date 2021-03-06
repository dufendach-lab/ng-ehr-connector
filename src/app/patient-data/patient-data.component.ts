import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;
import {FhirAuthService} from "../fhir-auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  hasSent: boolean = false;

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
      {name: 'conditions', completed: true, subtasks: []},
      {name: 'procedure', completed: true, subtasks: []},
    ]
  }

  constructor(private obsService: ObservationService,
              private fauth: FhirAuthService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void { // Calls to grab data from EHR
    this.obsService.getObservationByCategory("vital-signs").then(b => this.vitalsBundle.next(b));
    this.obsService.getObservationByCategory("laboratory").then(b => this.labBundle.next(b));
    this.obsService.getData('MedicationStatement').then(b => this.medBundle.next(b));
    this.obsService.getData('Condition').then(b => this.conditionBundle.next(b));
    this.obsService.getData('Procedure').then(b => this.procedureBundle.next(b));
    // this.obsService.getObservation().then(b => this.testBundle.next(b)); THIS STATEMENT USED FOR LOINC TESTING
  }

  allComplete: boolean = false;
  // These three functions handle checkbox selections
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

  switchPt() {
    let key = sessionStorage.getItem('SMART_KEY');
    if(key !== null) {
      key = key.replace(/^"|"$/g, ''); // Remove quotes from smart key string
      const parsed = JSON.parse(sessionStorage.getItem(key)!);
      const params = this.fauth.getAuthParams({OrganizationName: '', FHIRPatientFacingURI: `${parsed.serverUrl}`});
      this.fauth.authorize(params);
    }
  }

  async submitData() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.openSnackBar('Successful!', 'Close');
    this.hasSent = true;
  //   if(this.task.subtasks[0].completed) {
  //     console.log('Vitals - is selected');
  //     let obs = this.vitalsBundle.asObservable();
  //     obs.pipe().subscribe(val => {
  //       console.log(val.entry)
  //     })
  //   }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3200,
      panelClass: ['success-snackbar']
    });
  }
}
