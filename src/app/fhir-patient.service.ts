import { Injectable, Input } from '@angular/core';
import { fhirclient } from 'fhirclient/lib/types';

import Patient = fhirclient.FHIR.Patient;

// Refactor 'let' inits
//

@Injectable({
  providedIn: 'root'
})
export class FhirPatientService {
  constructor() { }

  // Grabs patients name
  getName(pt: Patient | null | undefined): string {
    const name: string = pt?.name[0];

    if(name) {
      const res: string = pt?.name[0].given[0] + " " + pt?.name[0].family;
      return res;
    }
    return 'N/A';
  }

  // Grabs patients bday
  getBday(pt: Patient | null | undefined): string {
    const bday: string = pt?.birthDate;

    if(bday) {
      return bday;
    }
    return 'N/A';
  }

  // Grabs Patients gender
  getGender(pt: Patient | null | undefined): string {
    const gender: string = pt?.gender;

    if(gender) {
      return gender.toUpperCase();
    }
    return 'N/A';
  }

  // Grabs phone number
  getPhoneNum(pt: Patient | null | undefined): string {
    const phone: string = pt?.telecom[0].value;

    if(phone) {
      return phone;
    }
    return 'N/A';
  }

  // Grabs full address
  getAddress(pt: Patient | null | undefined): string {
    const hold = pt?.address[0];
    const address: string = hold.line[0];
    const city: string = hold.city;
    const state: string = hold.state;
    const zip: string = hold.postalCode;
    const country: string = hold.country;

    if(hold){
      let res;
      if(hold.line[1]) {
        let extraInfo = hold.line[1];
        res = address + " " + extraInfo + ",  " + city + ", " + state + " " + zip;
        return res;
      }
      res = address + ", " + city + ", " + state + " " + zip;
      return res;
    }
    return 'N/A';
  }
}
