import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegistrationComponent } from '../registration/registration.component';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private RegAuth: AuthService,
    private auth: AuthService,) { }

  ngOnInit(): void {
    this.RegAuth.user.subscribe();
  }

  onSubmit(): void{
    this.RegAuth.checkCreditionals(this.loginData.username, this.loginData.password);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }
}
