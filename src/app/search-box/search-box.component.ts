import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  placeholder:any = '';
  baseUrl: string = 'https://fhir.loinc.org';
  lookupUrl: string = `https://fhir.loinc.org/CodeSystem/$lookup?system=http://loinc.org&code=${this.placeholder}`;


  constructor() { }

  ngOnInit(): void {
  }
}
