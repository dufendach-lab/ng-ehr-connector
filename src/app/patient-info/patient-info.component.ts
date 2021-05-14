import { Component, OnInit } from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import {filter, switchMap} from "rxjs/operators";
import {from, of} from "rxjs";
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  patient = this.patientService.patient;
  name: string = 'Johnathan Doe';
  ptBirth: string ='11/08/2000';
  ptHeight: string = '187.96cm'

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
  }

}
