import {Component, Input, OnInit} from '@angular/core';
import {PatientStateService} from "../patient-state.service";
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

  active = '';
  inactive = '#f2f2f3';
  activePane = 'first';
  lastPane = 0;

  tiles: Tile[] = [];

  constructor(private stateServ: PatientStateService, private breakpointObserver: BreakpointObserver) {
    this.stateServ.getPatientState().subscribe(data => {
      if (data) {
        let state = this.stateServ.getStateEnum(data[data.length - 1].pregnancyStatus);
        this.active = this.stateServ.setColor(state!);
      }
    });
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
