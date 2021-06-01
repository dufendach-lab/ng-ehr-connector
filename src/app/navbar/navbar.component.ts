import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {FhirAuthService} from '../fhir-auth.service';
import {IRegistration} from 'src/Interfaces/IRegistration';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly isAuth = this.auth.authorized;
  readonly isAuth2 = this.ehrAuth.user;
  userInfo: Observable<IRegistration | undefined>;
  nameConcat = '';

  constructor(private router: Router,
              private auth: FhirAuthService,
              private ehrAuth: AuthService,
              private afs: AngularFirestore) {
    this.userInfo = this.ehrAuth.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data()))
      )
    )
  }

  ngOnInit(): void {
    this.userInfo.subscribe(user => {
      if (user) {
        this.nameConcat = user.firstName + ' ' + user.lastName
      }
    })
  }

}
