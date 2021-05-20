import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  userDataForm = this.fb.group({
    endOfGestation: ['', Validators.required], // Date
    gestationalAgeWk: ['', Validators.required], // Numerical
    gestationalAgeDay: ['', Validators.required],
    ruptMembranes: ['', Validators.required], // Y/N - If yes, gestational age at time of rupture (num)
    ageAtRuptTimeWk: [''],
    ageAtRuptTimeDay: [''],
    deliverLoc: ['', Validators.required], // CCHMC, GSH, UC, or other - If other, describe (free text)
    otherDesc: [''],
    donOrRec: ['', Validators.required], // Donor or recipient option (triggers secSet)
    secSet: this.fb.group({
      typeOfBirth: ['', Validators.required], // Cesarea or Vaginal
      birthWeight: ['', Validators.required], // Numerical (g)
      sexOfChild: ['', Validators.required], // M/F
      fetalMRN: ['', Validators.required], // Numerical
      babyName: ['', Validators.required], // Free text
      liveBirth: ['', Validators.required], // Y/N
      deathInThirty: ['', Validators.required], // Y/N - If yes, explain reason (free text)
      deathDesc: [''],
      termination: ['', Validators.required]// Y/N
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    console.warn(JSON.stringify(this.userDataForm.value));
  }
}
