import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Interface to hold form data that will be put in DB
export interface patientData {
  babyName: string,
  DOB: string,
  birthTime: string,
  birthWeightLbs: string,
  birthWeightOs: string,
  sexOfChild: string,
  deliveryLocation: string,
  otherDescription: string,
  typeOfBirth: string,
  babyStatus: string,
  typeEquipment: string,
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  userDataForm = this.fb.group({
    babyName: ['', Validators.required],
    DOB: ['', Validators.required], // Date
    birthTime: ['', Validators.required],
    birthWeightLbs: ['', Validators.required],
    birthWeightOs: ['', Validators.required],
    sexOfChild: ['', Validators.required], // M/F
    deliverLoc: ['', Validators.required], // CCHMC, GSH, UC, or other - If other, describe (free text)
    otherDesc: [''],
    typeOfBirth: ['', Validators.required], // Cesarea or Vaginal / Natural or C-section
    babyStatus: ['', Validators.required], // Y/N to recieving equipment on discharge
    typeEquipment: ['', Validators.required],
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
