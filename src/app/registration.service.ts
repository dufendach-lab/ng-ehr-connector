import { Injectable } from '@angular/core';
import { getPatientParam } from 'fhirclient/lib/lib';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user: IRegistration = {
    firstName: 'Jane',
    lastName: 'Doe',
    MotherDoB: new Date(),
    EstDueDate: new Date(),
    Diagnosis: '',
    hospital: ['CCHMC'],
  }
  constructor() { }

  //Updates User Info above when a registered person is logged in
  async updatePatient(patient: IRegistration): Promise<void>{
    console.log('update');
    console.log(this.user);
    this.user = patient;
  }

  async getPatient(): Promise<IRegistration> {
    console.log('get');
    console.log(this.user);
    return this.user;
  }
}
