import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {PatientStateService} from "../../../services/patient-state.service";

@Component({
  selector: 'app-patient-state',
  templateUrl: './patient-state.component.html',
  styleUrls: ['./patient-state.component.scss']
})
export class PatientStateComponent implements OnInit {

  @ViewChild('stepper') stepper;
  isChecked = false;
  index: number | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private stateService: PatientStateService) {
      this.stateService.state$.pipe().subscribe(val => {
        this.index = val;
      })
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._setStepper(this.index!);
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
