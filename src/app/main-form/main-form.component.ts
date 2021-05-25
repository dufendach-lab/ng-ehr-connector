import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Interface to hold form data that will be put in DB
export interface patientData {
  endOfGestation: string,
  gestationalAgeWeek: string,
  gestationalAgeDay: string,
  rupturedMembranes: string,
  ageAtRuptureTimeWeek: string,
  ageAtRuptureTimeDay: string,
  delivereryLocation: string,
  otherDescription: string,
  donorOrRecipient: string,
  typeOfBirth: string,
  birthWeight: string,
  sexOfChild: string,
  fetalMRN: string,
  babyName: string,
  liveBirth: string,
  deathInThirty: string,
  deathDescription: string,
  termination: string
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  userDataForm = this.fb.group({
    endOfGestation: ['', Validators.required], // Date
    gestationalAgeWk: ['', Validators.required], // Numerical
    gestationalAgeDay: ['', Validators.required],
    ruptMembranes: ['', Validators.required], // Y/N - If yes, gestational age at time of rupture (num)
    ageAtRuptTimeWk: [''],
    ageAtRuptTimeDay: [''],
    deliverLoc: ['', Validators.required], // CCHMC, GSH, UC, or other - If other, describe (free text)
    otherDesc: [''],
    donOrRec: ['', Validators.required], // Donor or recipient option (triggers secSet)
    secSet: this.fb.group({
      typeOfBirth: ['', Validators.required], // Cesarea or Vaginal
      birthWeight: ['', Validators.required], // Numerical (g)
      sexOfChild: ['', Validators.required], // M/F
      fetalMRN: ['', Validators.required], // Numerical
      babyName: ['', Validators.required], // Free text
      liveBirth: ['', Validators.required], // Y/N
      deathInThirty: ['', Validators.required], // Y/N - If yes, explain reason (free text)
      deathDesc: [''],
      termination: ['', Validators.required]// Y/N
    })
  });

  newData = { } as patientData;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // TODO: currently console logs the data interface
  // Will hook up to firestore
  submit() {
    console.warn(this.newData);
  }
}
