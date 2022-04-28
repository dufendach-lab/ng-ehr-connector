import {Component, OnInit} from '@angular/core';
import {PatientStateService} from "../../../services/patient-state.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-resources-info-pane',
  templateUrl: './resources-info-pane.component.html',
  styleUrls: ['./resources-info-pane.component.scss']
})
export class ResourcesInfoPaneComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  selectedVal: string;
  activePane = 'first';
  lastPane = 0;

  tiles: Tile[] = [];

  constructor(private stateServ: PatientStateService, private breakpointObserver: BreakpointObserver) {

    this.selectedVal= 'first';
  }

  ngOnInit(): void {
  }

  onValChange(val: string) {
    this.selectedVal = val;
  }

  firstPaneClicked() {
    this.activePane = 'first';
    this.lastPane = 0;
  }
  secondPaneClicked() {
    this.activePane = 'second';
    this.lastPane = 2;
  }
  thirdPaneClicked() {
    this.activePane = 'third';
    this.lastPane = 3;
  }
}
