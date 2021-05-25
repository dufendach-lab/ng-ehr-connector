import {Component, Input, OnInit} from '@angular/core';
import {FhirPatientService} from '../fhir-patient.service';

import {fhirclient} from 'fhirclient/lib/types';
import Patient = fhirclient.FHIR.Patient;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  @Input() patient: Patient | null | undefined;

  // observation = this.obService.getObservation('29463-7');

  name: string = '';
  bday: string = '';
  gender: string = '';
  phoneNum: string = '';
  address: string = '';
  language: string = '';
  provider: string = '';

  constructor(private fps: FhirPatientService) {
  }

  // Initializes patient info using Fhir-patient service
  ngOnInit(): void {
    this.name = this.fps.getName(this.patient);
    this.bday = this.fps.getBday(this.patient);
    this.gender = this.fps.getGender(this.patient);
    this.phoneNum = this.fps.getPhoneNum(this.patient);
    this.address = this.fps.getAddress(this.patient);
    this.language = this.fps.getLanguage(this.patient);
    this.provider = this.fps.getProvider(this.patient);
  }

}
