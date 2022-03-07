import { Component, OnInit, Input } from '@angular/core';

import { fhirclient }from 'fhirclient/lib/types';
import Observation = fhirclient.FHIR.Observation;

@Component({
  selector: 'app-obs-value-display',
  templateUrl: './obs-value-display.component.html',
  styleUrls: ['./obs-value-display.component.scss']
})
export class ObsValueDisplayComponent implements OnInit {
  @Input() obsList: Observation[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

}
