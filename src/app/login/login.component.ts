import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

interface DialogData {
  username: string;
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginData = {} as DialogData;
  incorrectLogin = false;
  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  user = this.auth.user;
  registerEnabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,) {
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
    this.auth.checkCreditionals(this.loginData.username, this.loginData.password);
  }
}
