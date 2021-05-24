import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;
import { ObservationService } from '../observation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  // Holds search box value
  ptData = new FormControl("29463-7");

  obsBundle = new Subject<Bundle | Observation>();

  actualPtData: string = '';
  dataReceived: boolean = false;
  constructor(private obsService: ObservationService) { }

  ngOnInit(): void {
  }

  // Search function
  search(): void {
    this.dataReceived = true;
    this.actualPtData = this.ptData.value;

    this.obsService.getObservation(this.actualPtData).then(b => this.obsBundle.next(b));
  }

}
