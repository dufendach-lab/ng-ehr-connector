import { Component, OnInit } from '@angular/core';
import {FhirAuthService} from "../fhir-auth.service";
import {filter, switchMap} from "rxjs/operators";
import {from, Observable, of} from "rxjs";
import { PatientService } from '../patient.service';
import { ObservationService } from '../observation.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  patient = this.patientService.patient;
  oberservation = this.obService.getObservation('29463-7');

  constructor(private patientService: PatientService, private obService: ObservationService) {
  }

  ngOnInit(): void {
  }

}
