import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Interface to hold form data that will be put in DB
export interface patientData {
  babyFirstName: string,
  babyLastName: string,
  DOB: string,
  TOB: string,
  birthWeightLbs: string,
  birthWeightOs: string,
  sexOfChild: string,
  deliveryLocation: string,
  otherDescription: string,
  typeOfBirth: string,
  babyStatus: string,
  typeEquipment: string,
  diagnosis: string,
  wasTransfered: string,
  transferedTo: string,
  DOD: string,
  dateOfDischarge: string,
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  userDataForm = this.fb.group({
    babyFirstName: ['', Validators.required],
    babyLastName: ['', Validators.required],
    DOB: ['', Validators.required], // Date
    TOB: ['', Validators.required],
    birthWeightLbs: ['', Validators.required],
    birthWeightOs: ['', Validators.required],
    sexOfChild: ['', Validators.required], // M/F
    deliverLoc: ['', Validators.required], // CCHMC, GSH, UC, or other - If other, describe (free text)
    otherDesc: [''],
    typeOfBirth: ['', Validators.required], // Cesarea or Vaginal / Natural or C-section
    babyStatus: ['', Validators.required], // Y/N to recieving equipment on discharge
    typeEquipment: [''],
    diagnosis: [''],
    wasTransfered: [''],
    transferedTo: [''],
    DOD: [''],
    dateOfDischarge: [''],
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
