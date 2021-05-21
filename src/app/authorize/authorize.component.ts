import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  isAuthorized = this.auth.authorized;
  client = this.auth.client;

  stateCtrl = new FormControl();
  options: string[] = ['SmartHealthIT', 'epicHealthService', 'ExtraExtra'];
  filteredOptions: Observable<string[]> | any;

  constructor(private auth: FhirAuthService) {
  }

  ngOnInit() {
      this.check();
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

  // Triggers page reload in ngOnInit
  check(): void {
    if(!sessionStorage.getItem('foo')) {
      sessionStorage.setItem('foo', 'no reload');
      location.reload();
    }
  }

}
