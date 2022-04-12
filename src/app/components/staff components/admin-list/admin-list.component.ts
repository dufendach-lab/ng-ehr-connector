import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IRegistration } from '../../../../Interfaces/IRegistration'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  allPatients?: Observable<IRegistration[]>;
  myControl: FormControl = new FormControl()
  patientNames: string[] = [];
  patientObj: IRegistration[] = [];
  filteredOptions: Observable<IRegistration[]> | any;

  /*
  * Constructor grabs all patients and stores in patientObj
  */
  constructor(private authSer: AuthService, private routing: Router,) {
    this.allPatients = this.authSer.GetAllPats();
    this.allPatients.subscribe(value => {
      value.forEach(val => {
        this.patientObj.push(val);
      })
    })
  }

  /*
  * filters search options for the patient search piece of html
  */
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.lastName)),
      map(name => (name ? this._filter(name) : this.patientObj.slice()))
    );
  }

  /*
  * takes a patients docId and redirects to that specific patient edit page
  */
  editPatient(patID: string | undefined): void {
    if(patID){
      this.routing.navigate(['admin', 'patient', patID])
    }
    else{
      console.log("Something wrong");
    }
  }

  /*
  * helper filter function for patient search - used in ngOnInit
  */
  private _filter(value: string): IRegistration[] {
    const filterValue = value.toLowerCase();

    return this.patientObj.filter(option => option.lastName.toLowerCase().includes(filterValue));
  }

  /*
  * takes in a name and searches patientObj for this name. Returns the docId of that patient
  * used in onSubmit
  */
  private findDoc(name: string): string {
    const obj = this.patientObj.find(value => value.lastName === name);
    if(obj) {
      return obj.docName;
    } else {
      return 'No match.';
    }
  }

  onSubmit() {
    this.editPatient(this.findDoc(this.myControl.value));
  }
}
