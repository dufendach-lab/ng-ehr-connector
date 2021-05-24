import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {fhirclient} from 'fhirclient/lib/types';
import {ObservationService} from '../observation.service';
import {FormControl} from '@angular/forms';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  // Holds search box value
  ptData = new FormControl("29463-7");
  category = new FormControl("vital-signs");

  obsBundle: Subject<Bundle | Observation> = new Subject();

  // obsBundle: Subject<Bundle | Observation> = new Subject();

  constructor(private obsService: ObservationService) {
  }

  ngOnInit(): void {
  }

  // Search function
  search(): void {
    const code = this.ptData.value;
    if (code) {
      console.log(`getting code ${code}`);
      this.obsService.getObservation(code).then(b => {
        console.log('value returned:');
        console.log(b);
        this.obsBundle.next(b);
      });

    }

  }

  searchByCategory(): void {
    const category = this.category.value;
    if (category) {
      this.obsService.getObservationByCategory(category).then(b => this.obsBundle.next(b));

    }
  }

}
