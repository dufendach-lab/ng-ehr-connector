import { Component, Input, OnInit } from '@angular/core';

import { fhirclient }from 'fhirclient/lib/types';
import Bundle = fhirclient.FHIR.Bundle;

@Component({
  selector: 'app-obs-value-list',
  templateUrl: './obs-value-list.component.html',
  styleUrls: ['./obs-value-list.component.scss']
})
export class ObsValueListComponent implements OnInit {

  //@Input() observations: Bundle;

  constructor() { }

  ngOnInit(): void {
  }

}
