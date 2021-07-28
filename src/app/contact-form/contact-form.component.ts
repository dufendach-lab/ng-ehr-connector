import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface email {
  name: string,
  email: string,
  content: string
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  body: string = "This is the body of the email";

  cForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    concerns: ['', Validators.required]
  })

  emailInfo = {} as email;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  sendEmail() {
    // Email will need changed
    // Change email format
    const mail: string = "mailto:Christian.France@cchmc.org?subject=App%20Name%20Issue&body=Name: " + this.emailInfo.name + "%0D%0AEmail: " + this.emailInfo.email + "%0D%0A%0D%0A Issue: %0D%0A" + this.emailInfo.content
    location.href = mail;
  }

}
