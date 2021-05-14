import { Component, Input, OnInit } from '@angular/core';
import { ObservationService } from '../observation.service';

import { fhirclient }from 'fhirclient/lib/types';
import Patient = fhirclient.FHIR.Patient;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  @Input() patient: Patient | null | undefined;

  oberservation = this.obService.getObservation('29463-7');

  name: string = '';
  ptBirth: string ='11/08/2000';
  ptHeight: string = '187.96cm';


  constructor(private obService: ObservationService) {
    console.log(this.patient);
  }

  ngOnInit(): void {
    this.getName();
  }

  getName(): void {
    const name = this.patient?.name[0];

    if(name) {
      this.name = `${name.given[0]} ${name.family}`;
    }
  }

}
