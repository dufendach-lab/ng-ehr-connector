import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {FhirAuthService} from "./fhir-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthorized = this.auth.authorized;
  client = this.auth.client;

  stateCtrl = new FormControl();
  options: string[] = ['SmartHealthIT', 'epicHealthService', 'ExtraExtra'];
  filteredOptions: Observable<string[]> | any;

  constructor(private auth: FhirAuthService) {

  }

  ngOnInit() {
    this.filteredOptions = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  authorize(val: string) {
    this.auth.testAuth(val);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
