import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {first, map, startWith} from 'rxjs/operators';
import {FhirAuthService} from "../fhir-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  client = this.auth.client;

  stateCtrl = new FormControl();
  options: string[] = ['SmartHealthIT', 'epicHealthService', 'ExtraExtra'];
  filteredOptions: Observable<string[]> | any;

  constructor(private auth: FhirAuthService, private router: Router) {

    // If authorized, navigate to dashboard instead
    this.auth.authorized
      .pipe(first(value => value === true))
      .subscribe(_ => router.navigate(['/dashboard']))
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

  // Triggers page reload in ngOnInit
  check(): void {
    if (!sessionStorage.getItem('foo')) {
      sessionStorage.setItem('foo', 'no reload');
      location.reload();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
