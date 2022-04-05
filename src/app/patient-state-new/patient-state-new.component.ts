import {Component, Input, OnInit} from '@angular/core';
import {GravidasService} from "../gravidas.service";
import {PatientStateService} from "../patient-state.service";

@Component({
  selector: 'app-patient-state-new',
  templateUrl: './patient-state-new.component.html',
  styleUrls: ['./patient-state-new.component.scss']
})
export class PatientStateNewComponent implements OnInit {
  @Input() setIndex: number = -1;
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
  }

  ngOnInit(): void {
    this.step = this.setIndex;
    this.checkPanelStates();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.state.setPatientState(this.setIndex, this.gravName);
    this.step++;
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
