import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Feedback } from 'src/Interfaces/Feedback';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id : string}, public fb: FormBuilder , private afs: AngularFirestore) { }
 

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


 feebackForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  feedback: [''],
 }) 

 ngOnInit(): void {

}


onSave(){
  const form = this.feebackForm.value
  const feedback: Feedback = {
   firstName:  form.firstName,
   lastName:  form.lastName,
   email:  form.email,
   feedback:  form.feedback,
  }
  this.afs.collection('feedback').doc().set(feedback)
  console.log('feedback sent')
}

}
