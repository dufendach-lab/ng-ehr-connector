import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

interface formData {
  status: string,
  DateOD: string,
  wasStillbirth: string,
  bday: string,
  btime: string,
  bsex: string,
  baby: string,
  hospital: string
}

const validatorz = [Validators.required];

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  formVals = {} as formData;

  dialogForm = this.fb.group({
    status: ['', Validators.required],
    DOD: [''],
    stillbirth: [''],
    birthDate: [''],
    birthTime: [''],
    birthSex: [''],
    babyName: [''],
    inHospital: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private fb: FormBuilder) {

      // FORM VALIDATORS
      this.dialogForm.controls['status'].valueChanges.subscribe(result => {
        if(result === "born") {
          this.dialogForm.controls['birthDate'].setValidators(validatorz);
          this.dialogForm.controls['birthDate'].updateValueAndValidity();
          this.dialogForm.controls['birthTime'].setValidators(validatorz);
          this.dialogForm.controls['birthTime'].updateValueAndValidity();
          this.dialogForm.controls['birthSex'].setValidators(validatorz);
          this.dialogForm.controls['birthSex'].updateValueAndValidity();
          this.dialogForm.controls['babyName'].setValidators(validatorz);
          this.dialogForm.controls['babyName'].updateValueAndValidity();
          this.dialogForm.controls['inHospital'].setValidators(validatorz);
          this.dialogForm.controls['inHospital'].updateValueAndValidity();
          this.dialogForm.controls['DOD'].setValidators(null);
          this.dialogForm.controls['DOD'].updateValueAndValidity();
          this.dialogForm.controls['stillbirth'].setValidators(null);
          this.dialogForm.controls['stillbirth'].updateValueAndValidity();
        } else if (result === "died") {
          this.dialogForm.controls['birthDate'].setValidators(null);
          this.dialogForm.controls['birthDate'].updateValueAndValidity();
          this.dialogForm.controls['birthTime'].setValidators(null);
          this.dialogForm.controls['birthTime'].updateValueAndValidity();
          this.dialogForm.controls['birthSex'].setValidators(null);
          this.dialogForm.controls['birthSex'].updateValueAndValidity();
          this.dialogForm.controls['babyName'].setValidators(null);
          this.dialogForm.controls['babyName'].updateValueAndValidity();
          this.dialogForm.controls['inHospital'].setValidators(null);
          this.dialogForm.controls['inHospital'].updateValueAndValidity();
          this.dialogForm.controls['DOD'].setValidators(validatorz);
          this.dialogForm.controls['DOD'].updateValueAndValidity();
          this.dialogForm.controls['stillbirth'].setValidators(validatorz);
          this.dialogForm.controls['stillbirth'].updateValueAndValidity();
        }
      })
     }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.formVals);
  }



}
