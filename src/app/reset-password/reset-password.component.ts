import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetSent = false;
  emailNotInUse = false;
  enteredEmail = "";
  passwordReset = this.fb.group({
    email: ['', Validators.required],
  })

  constructor(private afa: AngularFireAuth,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onCancelClick(): void{
    this.dialogRef.close();
  }

  onRestClick(): void{
    const userEmail = this.passwordReset.controls['email'].value;
    console.log(userEmail);
    this.afa.sendPasswordResetEmail(userEmail).then(() => {
      this.emailNotInUse = false;
      this.resetSent = true;
    }).catch((err) => {
      this.resetSent = false;
      this.emailNotInUse = true;
    })
    this.enteredEmail = userEmail;
  }
}
