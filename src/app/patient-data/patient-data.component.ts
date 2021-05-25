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

  ptData = new FormControl('29463-7');
  formValue = new FormControl('vital-signs');

  obsBundle: Subject<Bundle | Observation> = new Subject();

  task: Task = {
    name: 'Authorize All',
    completed: false,
    subtasks: [
      {name: 'vitals', completed: false, subtasks: []},
      {name: 'socials', completed: false, subtasks: []},
      {name: 'labs', completed: false, subtasks: []}
    ]
  };

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


  // TESTING DROP MENUS AND CHECKBOXES
  // allComplete: boolean = false;

  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }

}
