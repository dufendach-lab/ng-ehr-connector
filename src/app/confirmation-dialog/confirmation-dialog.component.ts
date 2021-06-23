import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

interface formData {
  bday: string,
  btime: string,
  bsex: string,
  baby: string
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  formVals = {} as formData;

  dialogForm = this.fb.group({
    birthDate: ['', Validators.required],
    birthTime: ['', Validators.required],
    birthSex: ['', Validators.required],
    babyName: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.formVals);
  }

}
