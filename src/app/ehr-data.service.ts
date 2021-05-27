import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { IEhrData } from '../Interfaces/IEhrData';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EhrDataService {
  patientData: IEhrData = {};

  constructor(private db: AngularFirestore) { }

  getEhrData() {

  }

  createEhrData() {

  }

  updateEhrData() {

  }

  deleteEhrData() {

  }

}
