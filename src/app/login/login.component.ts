import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IRegistration } from 'src/Interfaces/IRegistration';
import { AngularFirestore } from '@angular/fire/firestore';

// interface DialogData {
//   username: string;
//   password: string
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  forgotPass = false;
  // loginData = {} as DialogData;
  incorrectLogin = false;

  login = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  passwordReset = this.fb.group({
    email: ['', Validators.required],
  })
  user = this.auth.user;
  registerEnabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private afa: AngularFireAuth,
    private dialog: MatDialog,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    //  this.auth.user.pipe(first()).subscribe();
  }

  //
  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   // console.log(event);
  //   if (event.key === "Enter") {
  //     this.onSubmit();
  //   }

  onSubmit(): void {
    this.auth.checkCreditionals(this.login.value['username'], this.login.value['password'])
      .then(user => {
        this.incorrectLogin = user !== null;
      })
      .catch(_ => this.incorrectLogin = true);
  }

  // resetPassword(): void{
  //   let dialogRef = this.dialog.open(ResetPasswordComponent, {
  //     width: '40%',
  //   });
  // }

  forgotPassword(): void{
    this.forgotPass = true;
    this.dialog.open(ResetPasswordComponent, {
      width: '40%',
    });
  }

  checkAdmin() : Observable<boolean> { 
    return this.afa.user.pipe(switchMap((user) => {
      // If there is no user (i.e. no one is logged in), return an observable of "false" - i.e. not allowed to activate
      if (!user) return of(false)
      
     

      // Otherwise, get the user details (TODO: Change this to User Service)
      // If the user has the role admin, then return true otherwise return false again
      return this.afs
        .collection('patients')
        .doc<IRegistration>(user.uid)
        .valueChanges()
        .pipe(
          first(),
          map(iReg => iReg !== undefined && iReg.role === 'Admin')
        )
    }))
  }

  checkUser() : Observable<boolean> { 
    return this.afa.user.pipe(switchMap((user) => {
      // If there is no user (i.e. no one is logged in), return an observable of "false" - i.e. not allowed to activate
      if (!user) return of(false);

      // Otherwise, get the user details (TODO: Change this to User Service)
      // If the user has the role admin, then return true otherwise return false again
      return this.afs
        .collection('patients')
        .doc<IRegistration>(user.uid)
        .valueChanges()
        .pipe(
          first(),
          map(iReg => iReg !== undefined && iReg.role === 'User' )
        )
    }))
  }
}
