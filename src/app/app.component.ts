import { Component } from '@angular/core';
import {FhirAuthService} from "./fhir-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  client = this.auth.client;

  constructor(private auth: FhirAuthService) {
  }

  authorize() {
    this.auth.testAuth();
  }
}
