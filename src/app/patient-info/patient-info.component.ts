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

  observation = this.obService.getObservation('29463-7');

  name: string = '';
  bday: string = '';
  gender: string = '';

  constructor(private obService: ObservationService) {
    console.log(this.patient);
  }

  ngOnInit(): void {
    this.getName();
    this.getBday();
    this.getGender();
  }

  getName(): void {
    const name = this.patient?.name[0];

    if(name) {
      this.name = `${name.given[0]} ${name.family}`;
    }
  }

  getBday(): void {
    const bday = this.patient?.birthDate;

    if(bday) {
      this.bday = `${bday}`;
    }
  }

  getGender(): void {
    const gender = this.patient?.gender;

    if(gender) {
      this.gender = `${gender}`;
    }
  }

}
