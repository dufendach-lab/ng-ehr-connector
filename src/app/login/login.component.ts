import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

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
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.auth.user.pipe(first()).subscribe();
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
        this.router.navigate([''])
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
}
