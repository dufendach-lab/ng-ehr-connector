import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allPatients: any

  constructor(private authSer: AuthService, private routing: Router, private afs : AngularFirestore) { 
    this.allPatients = afs.collection('patient').valueChanges({ idField: 'id' })
    this.allPatients.subscribe(id => {
      console.log(id.id)
    })
  }

  ngOnInit(): void {
    
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
