import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IRegistration } from '../../Interfaces/IRegistration'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  allPatients: Observable<IRegistration[]> | undefined

  constructor(private authSer: AuthService, private routing: Router,) { }

  ngOnInit(): void {
    this.allPatients = this.authSer.GetAllPats();
    console.log(this.allPatients);
  }

  editPatient(patID: string | undefined): void {
    if(patID){
      console.log(patID);
      this.routing.navigate(['patient', patID])
    }
    else{
      console.log("Something wrong");
    }
  }
}
