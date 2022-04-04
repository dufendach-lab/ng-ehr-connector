import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { map, switchMap } from 'rxjs/operators';

export enum PregState {
  FETALCARE,
  HOME,
  DELIVERED,
  NICU
}

@Injectable({
  providedIn: 'root'
})
export class PatientStateService {

  constructor(private afs: AngularFirestore,
              private afa: AngularFireAuth) {}

  getPatientState() {
    return this.afa.user.pipe(
      switchMap((user) => {
        if(user) {
          return this.afs.collection('patients').doc(user.uid).collection('gravidas').valueChanges();
        }
        return Promise.reject(new Error('User is not defined...'));
      })
    );
  }

  setPatientState(state: PregState, docName: string) {
    const stateName = this._setStateString(state);
    console.log(stateName);
    this.afa.user.subscribe((user) => {
      if (user) {
        this.afs.collection('patients').doc(user.uid).collection('gravidas').doc(docName).update({pregnancyStatus: stateName});
      }
    })
  }

  private _setStateString (stateNum: PregState): string {
    if (stateNum == 0) return 'HOME';
    if (stateNum == 1) return 'DELIVERED';
    if (stateNum == 2) return 'NICU';
    if(stateNum == 3) return 'NICU';
    else return 'ERROR';
  }
  setColor(state: PregState): string {
    if(state == 0) return '#ca5699';
    if(state == 1) return '#73b44a';
    if(state == 2) return '#0090b4';
    if(state == 3) return '#99336e';
    return '';
  }
  getStateEnum (stateName: string): PregState | undefined {
    if (stateName == 'FETALCARE') return PregState.FETALCARE;
    if (stateName == 'HOME') return PregState.HOME;
    if (stateName == 'DELIVERED') return PregState.DELIVERED;
    if (stateName == 'NICU') return PregState.NICU;
    else return;
  }
}
