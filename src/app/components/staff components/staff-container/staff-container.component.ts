import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss']
})
export class StaffContainerComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHomeRoute() {
    return this.router.url === '/admin/home';
  }

  back() {
    this.location.back();
  }

}
