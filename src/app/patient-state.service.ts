import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { first, switchMap } from 'rxjs/operators';
import { ReplaySubject } from "rxjs";

export enum PregState {
  FETALCARE = 1,
  HOME,
  DELIVERED,
  NICU
}

@Injectable({
  providedIn: 'root'
})
export class PatientStateService {

  private readonly _state$ = new ReplaySubject<PregState>(0);
  readonly state$ = this._state$.asObservable();

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.afa.user.pipe(
      switchMap((user) => {
        if(user) {
          return this.afs.collection('patients').doc(user.uid).collection('gravidas').valueChanges();
        }
        return Promise.reject(new Error('User is not defined...'));
      })
    ).pipe().subscribe(val => {
      let tempState = this._getStateEnum(val[0].pregnancyStatus);
      this._setState(tempState!);
    });

    this.state$.pipe(first()).subscribe();
  }

  setPatientState(state: PregState, docName: string) {
    const stateName = this._setStateString(state);
    this.afa.user.subscribe((user) => {
      if (user) {
        this.afs.collection('patients').doc(user.uid).collection('gravidas').doc(docName).update({pregnancyStatus: stateName});
      }
    })
  }

  /*
  * UTILITY FUNCTIONS
  * */
  private _setState(val: PregState) {
    this._state$.next(val);
  }
  private _setStateString (stateNum: PregState): string { // Returns the next state as a string to set in Firestore
    const cnt = Object.keys(PregState).length;

    if (stateNum < cnt - 1) return PregState[stateNum + 2];

    return PregState[cnt - 1];
  }
  private _getStateEnum (stateName: string): PregState | undefined {
    if (stateName == 'FETALCARE') return PregState.FETALCARE;
    if (stateName == 'HOME') return PregState.HOME;
    if (stateName == 'DELIVERED') return PregState.DELIVERED;
    if (stateName == 'NICU') return PregState.NICU;
    else return;
  }
}
