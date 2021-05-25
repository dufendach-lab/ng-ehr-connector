import { Injectable } from '@angular/core';
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
  updatePatient(): void{

  }
}
