import { Component, Input, OnInit } from '@angular/core';

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

@Component({
  selector: 'app-obs-value-list',
  templateUrl: './obs-value-list.component.html',
  styleUrls: ['./obs-value-list.component.scss']
})
export class ObsValueListComponent implements OnInit {

  @Input() observations: Bundle | null | Observation = null;

  obsList: Observation[] = [];



  constructor() { }

  ngOnInit(): void {
    console.log(this.observations?.entry);
    if (this.observations) {
      this.obsList = this.observations.entry;
      console.log(this.obsList[0]);
    }
  }

}
