import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  cForm = this.fb.group({
    name: [''],
    email: [''],
    subject: [''],
    concerns: ['']
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
