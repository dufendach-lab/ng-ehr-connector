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

  allUsers: any

  constructor(private authSer: AuthService, private routing: Router, private afs : AngularFirestore) { 
    this.allUsers = afs.collection('patients').valueChanges({ idField: 'id' })
  
  }

  ngOnInit(): void {
    
    console.log(this.allUsers.id);
  }

onclick(){
  
}

}
