import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import {formatDate} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

// Interface to hold form data that will be put in DB
export interface patientData {
  babyFirstName: string,
  babyLastName: string,
  DOB: string,
  TOB: string,
  birthWeight: string,
  sexOfChild: string,
  deliveryLocation: string,
  otherDescription: string,
  typeOfBirth: string,
  babyStatus: string,
  typeEquipment: string,
  diagnosis: string,
  wasTransferred: string,
  transferredTo: string,
  DOD: string,
  dateOfDischarge: string,
}
//

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  userDataForm = new FormGroup({
    babyFirstName: new FormControl('', Validators.required),
    babyLastName: new FormControl('', Validators.required),
    DOB: new FormControl('', Validators.required), // Date
    TOB: new FormControl('', Validators.required),
    birthWeightLbs: new FormControl('', Validators.required),
    birthWeightOs: new FormControl('', Validators.required),
    sexOfChild: new FormControl('', Validators.required), // M/F/U
    deliverLoc: new FormControl('', Validators.required), // CCHMC, GSH, UC, or other - If other, describe (free text)
    otherDesc: new FormControl(''),
    typeOfBirth: new FormControl('', Validators.required), // Cesarea or Vaginal / Natural or C-section
    babyStatus: new FormControl('', Validators.required), // Y/N to recieving equipment on discharge
    typeEquipment: new FormControl(''),
    diagnosis: new FormControl(''),
    wasTransferred: new FormControl(''),
    transferredTo: new FormControl(''),
    DOD: new FormControl(''),
    dateOfDischarge: new FormControl(''),
  });

  newData = { } as patientData;
  hasSent: boolean = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  // TODO: currently console logs the data interface
  // Will hook up to firestore
  async submit() {
    this.newData = this.userDataForm.value
    this.newData.birthWeight = this._ImperialToMetric(this.userDataForm.controls['birthWeightLbs'].value, this.userDataForm.controls['birthWeightOs'].value).toString() + 'g';
    console.log(this._reformatDate(this.userDataForm.controls['DOB'].value))
    console.log(this.newData);

    await new Promise(resolve => setTimeout(resolve, 1500));
    this.openSnackBar('Successful!', 'Close');

    this.hasSent = true;
  }

  nextPt() {
    location.reload();
  }

  private _ImperialToMetric(lbs: number, oz: number): number {
    // 1 lb = 453.592 g
    // 1 oz = 28.3495 g
    let ans = 0;
    ans = (lbs * 453.592) + (oz * 28.3495);
    ans = Math.floor(ans * 10) / 10;
    return ans;
  }
  private _reformatDate(date: Date) {
    let ans = formatDate(date, 'dd-MMM-yy', 'en-US');
    let res = this._transformDate(ans);
    return res;
  }
  private _transformDate(date: string) {
    let first = date.substring(0,3);
    let ans = date.substring(3,6).toUpperCase();
    let last = date.substring(6,11);
    return first + ans + last;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3200,
      panelClass: ['success-snackbar']
    });
  }
}
