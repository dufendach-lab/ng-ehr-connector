import {Component, OnInit} from '@angular/core';
import {GravidasService} from "../gravidas.service";
import {PatientStateService, PregState} from "../patient-state.service";

@Component({
  selector: 'app-patient-state-new',
  templateUrl: './patient-state-new.component.html',
  styleUrls: ['./patient-state-new.component.scss']
})
export class PatientStateNewComponent implements OnInit {

  initStep: PregState | undefined;
  step: number = -1;

  canOpenPanelOne: boolean = false;
  canOpenPanelTwo: boolean = false;
  canOpenPanelThree: boolean = false;
  canOpenPanelFour: boolean = false;

  gravName: string = '';

  constructor(private gravService: GravidasService,
              private state: PatientStateService) {
    this.gravService.getGravidas().subscribe(grav => {
      if(grav){
        this.gravName = grav[grav.length - 1].gravidasTitle;
      }
    })
    this.state.state$.pipe().subscribe(value => {
      this.step = value - 1;
      this.initStep = value - 1;
      this.checkPanelStates();
    });
  }

  ngOnInit(): void {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.state.setPatientState(this.initStep!, this.gravName);
    this.step++;
    console.log(this.step);
    this.checkPanelStates();
  }

  prevStep() {
    this.step--;
  }

  checkPanelStates() {
    if(this.step > -1) {
      this.canOpenPanelOne = true;
    }
    if(this.step > 0) {
      this.canOpenPanelTwo = true;
    }
    if(this.step > 1) {
      this.canOpenPanelThree = true;
    }
    if(this.step > 2) {
      this.canOpenPanelFour = true;
    }
  }

}
