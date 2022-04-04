import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {PregState} from "../patient-state.service";

@Component({
  selector: 'app-patient-state',
  templateUrl: './patient-state.component.html',
  styleUrls: ['./patient-state.component.scss']
})
export class PatientStateComponent implements OnInit {
  @Input() indice: number = -1;
  @ViewChild('stepper') stepper;

  isChecked = false;

 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._setStepper(this.indice);
  }

  private _setStepper(index: number): void {
    this.stepper.linear = false;
    let currentStep = index;
    while (this.stepper.selectedIndex < currentStep) {
      this.stepper.selectedIndex += 1;
    }
    this.stepper.selectedIndex = currentStep;
    setTimeout(() => {
      this.stepper.linear = true;
    });
  }

}
