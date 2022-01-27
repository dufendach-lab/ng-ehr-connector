import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  allPatients?: Observable<IRegistration[]>;
  myControl: FormControl = new FormControl()

  constructor(private authSer: AuthService, private routing: Router,) {
  }

  ngOnInit(): void {
    this.allPatients = this.authSer.GetAllPats();
  }

  editPatient(patID: string | undefined): void {
    if(patID){
      this.routing.navigate(['patient', patID])
    }
    else{
      console.log("Something wrong");
    }
  }
  onSubmit() {
    let dir = this.myControl.value
    this.routing.navigate(['patient', dir])
  }
}
