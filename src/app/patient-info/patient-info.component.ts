import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ObservationService } from '../observation.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  patient = this.patientService.patient;
  observation = this.obService.getObservation('29463-7');

  name: string = 'FIRST_LAST';
  ptBirth: string ='00/00/0000';
  ptHeight: string = '000.00cm';

  constructor(private patientService: PatientService, private obService: ObservationService) {
  }

  ngOnInit(): void {
  }

}
