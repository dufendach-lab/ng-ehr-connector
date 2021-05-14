import { Component, OnInit } from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import {filter, switchMap} from "rxjs/operators";
import {from, of} from "rxjs";

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  patient: any;
  name: string = 'Johnathan Doe';
  ptBirth: string ='11/08/2000';
  ptHeight: string = '187.96cm'


  constructor(auth: FhirAuthService) {
    this.patient = auth.client.pipe(
      filter(client => client !== null),
      switchMap(client => {
        if (client !== null) {
          return from(client.request(`Patient/${client.patient.id}`));
        } else {
          return of(null);
        }
      })
    );
  }

  ngOnInit(): void {
  }

}
