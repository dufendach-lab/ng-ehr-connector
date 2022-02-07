
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GravidasService } from '../gravidas.service';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-new-mom-resource',
  templateUrl: './new-mom-resource.component.html',
  styleUrls: ['./new-mom-resource.component.scss']
})
export class NewMomResourceComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  selectedResource = "";
  isPanelOpen: boolean = false;
  user = this.logAuth.user;
  diagnosis: string = '';

  constructor(private logAuth: AuthService,
              private gravService: GravidasService,
              private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.gravService.getGravidas().subscribe(grav => {
      if(grav) {
        const last = grav.length - 1;
        this.diagnosis = grav[last].Diagnosis;
      }
    })
  }
}
