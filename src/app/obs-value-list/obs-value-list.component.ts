import { formatDate } from '@angular/common';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;
import Observation = fhirclient.FHIR.Observation;

@Component({
  selector: 'app-obs-value-list',
  templateUrl: './obs-value-list.component.html',
  styleUrls: ['./obs-value-list.component.scss']
})
export class ObsValueListComponent implements OnChanges {
  @Input() observations: Bundle | null | Observation = null;

  obsList: Observation[] = [];
  check: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['observations']) {
      this.updateObservationList();
    }

  }

  private updateObservationList() {
    if (this.observations) {
      this.obsList = this.observations.entry;
      if(!this.observations.entry[0].resource.issue) { this.check = true; }
    }
  }

}
