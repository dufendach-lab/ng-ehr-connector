import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import {WINDOW} from "../../../util/window-provider";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  needAuth = getAuth();
  codeSent: boolean = false;
  winRef: any;

  login = this.fb.group({
    phoneNum: ['', Validators.required],
  });

  verify = this.fb.group({
    code: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    @Inject(WINDOW) private win: Window
  ) { }

  /*
  * Sets the window reference and creates the Recaptcha
  */
  ngOnInit(): void {
    this.winRef = this.win;
    this.winRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.needAuth);
    this.winRef.recaptchaVerifier.render()
  }

  /*
  * Sends number to auth for phone login
  */
  onSubmit(): void {
    const appVerif = this.winRef.recaptchaVerifier;
    this.codeSent = true;
    this.auth.phoneLogin(('+1' + this.login.value['phoneNum']), appVerif)
      .then(success => {
        this.winRef.confirmationResult = success;
      })
  }

  /*
  * Confirms the SMS code and redirects to landing
  */
  confirmCode() {
    this.winRef.confirmationResult.confirm(this.verify.value['code']).then(() => {
      this.router.navigate([''])
    })
  }

}
