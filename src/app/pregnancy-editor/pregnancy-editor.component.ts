import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pregnancy-editor',
  templateUrl: './pregnancy-editor.component.html',
  styleUrls: ['./pregnancy-editor.component.scss']
})
export class PregnancyEditorComponent implements OnInit {
  // @Input() patientId: string | null | undefined;
  constructor( private fb: FormBuilder,) { }


  isNewPregnancy = true;
  ngOnInit(): void {
  }

  pregnancyForm = this.fb.group({
    EstDueDate:[''],
    Diagnosis:[''],
    hospital:[''],
    parity:['',Validators.pattern("^[0-9]*$")],
    givenBirth:[''],

  })

  onSave(){
    console.log('this form should be saved')
  }
}
