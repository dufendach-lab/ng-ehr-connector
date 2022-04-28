import {Component, OnInit} from '@angular/core';
import {PatientStateService, PregState} from "../../../services/patient-state.service";
import {IFruit} from "../../../../Interfaces/IFruit";
import * as maFruits from "../../../../assets/fruits.json";
import {GravidasService} from "../../../services/gravidas.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-infant-cards',
  templateUrl: './infant-cards.component.html',
  styleUrls: ['./infant-cards.component.scss']
})
export class InfantCardsComponent implements OnInit {

  state$: Observable<PregState> = this.stateService.state$;
  controlState = PregState;

  twinA = {} as IFruit;
  twinB = {} as IFruit;
  fruits: IFruit[] = maFruits;

  eDD;
  iEGAWeeks: number = 0;
  iEGADays: string = '';

  constructor(private stateService: PatientStateService, private gravService: GravidasService) {
    this.gravService.getGravidas().subscribe(gravidas => {
      if(gravidas){
        const lastIndex = gravidas.length - 1;
        this.eDD = gravidas[lastIndex].EstDueDate;
        this.gestationalAgeCalc(this.eDD);
      }
    })

    this.twinA = this._getFruit(4);
    this.twinB = this._getFruit(3);
  }

  ngOnInit(): void { }

  private _getFruit(wgt1: number) {
    const arr = Array.from(this.fruits);
    const num = arr.reduce((prev, curr) => Math.abs(curr.weight - wgt1) < Math.abs(prev.weight - wgt1) ? curr : prev);
    const fruit = arr.find(obj => obj.weight === num.weight);
    if(fruit) {
      return fruit;
    } else {
      return {
        weight: 0,
        fruit: '',
        length: '',
        type: '',
        imgUrl: ''
      }
    }
  }

  /*
* Calculates gestational age in format of weeks & days
* Also sets momsFruits based on the week
*/
  gestationalAgeCalc(EstDD: any) {
    const today = new Date();
    const DD = new Date(EstDD.getUTCFullYear(), EstDD.getUTCMonth(), EstDD.getUTCDay());
    const daysUntilDD = (DD.getTime()-today.getTime()) / (1000 * 60 * 60 * 24 );
    const iGestationalAgeInDays = 280 - daysUntilDD;
    const fGestationalAgeInWeeks = iGestationalAgeInDays / 7;

    this.iEGAWeeks = Math.floor( fGestationalAgeInWeeks );
    this.iEGADays = ((fGestationalAgeInWeeks % 1)*6).toFixed(0);
  }

}
