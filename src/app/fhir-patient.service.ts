import { Injectable, Input } from '@angular/core';
import { fhirclient } from 'fhirclient/lib/types';

import Patient = fhirclient.FHIR.Patient;

@Injectable({
  providedIn: 'root'
})
export class FhirPatientService {
  constructor() { }

  // Grabs patients name
  getName(pt: Patient | null | undefined): string {
    if(pt?.name) {
      const res: string = pt?.name[0].given[0] + " " + pt?.name[0].family;
      return res;
    }
    return 'N/A';
  }

  // Grabs patients bday
  getBday(pt: Patient | null | undefined): string {
    if(pt?.birthDate) {
      const bday: string = pt?.birthDate;
      return bday;
    }
    return 'N/A';
  }

  // Grabs Patients gender
  getGender(pt: Patient | null | undefined): string {
    if(pt?.gender) {
      const gender: string = pt?.gender;
      return gender.toUpperCase();
    }
    return 'N/A';
  }

  // Grabs phone number
  getPhoneNum(pt: Patient | null | undefined): string {
    if(pt?.telecom) {
      const phone = pt?.telecom[0].value;
      return phone;
    }
    return 'N/A';
  }

  // Grabs full address
  getAddress(pt: Patient | null | undefined): string {
    if(pt?.address){
      const hold = pt?.address[0];
      const address: string = hold.line[0];
      const city: string = hold.city;
      const state: string = hold.state;
      const zip: string = hold.postalCode;
      let res;
      if(hold.line[1]) {
        const extraInfo = hold.line[1];
        res = address + " " + extraInfo + ", " + city + ", " + state + " " + zip;
        return res;
      }
      res = address + ", " + city + ", " + state + " " + zip;
      return res;
    } else {
      return 'N/A';
    }
  }

  // Gets primary spoken language
  getLanguage(pt: Patient | null | undefined): string {
    if(pt?.communication) {
      const res: string = pt?.communication[0].language.coding[0].display;
      console.log(res);
      return res;
    } else {
      return 'N/A';
    }
  }

  // Gets primary care physician
  getProvider(pt: Patient | null | undefined): string {
    if(pt?.careProvider) {
      const res = pt?.careProvider[0].display;
      return res;
    } else {
      return 'N/A';
    }
  }
}
