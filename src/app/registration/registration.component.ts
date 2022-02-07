import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FhirAuthService} from "../fhir-auth.service";
import {IRegistration} from '../../Interfaces/IRegistration';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import {AuthService} from "../auth.service";
// import { AngularFireFunctionsModule } from "@angular/fire/compat/functions";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  // passwordsMatch = true;
  // privacyPolicy = false;
  // isPage2 = false;
  // EmailInUse = false;
  // hide1 = true;
  // hide2 = true;

  // hospitalOptions: string[] = []
  // registrationInfo = {} as IRegistration;

  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // @ViewChild('hospitalInput') hospitalInput = {} as ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete = {} as MatAutocomplete;

  //The formbuilder reactive form
  // registration = this.fb.group({
  //   firstname: ['' , Validators.required],
  //   lastname: ['', Validators.required],
  //   MotherDoB: ['', Validators.required],
  //   phone: ['', Validators.required],
  //   email: ['', Validators.required],
  //   password1: ['', Validators.required],
  //   password2: ['', Validators.required],
  // })

  login = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private fhirService: FhirAuthService,
    private auth: AuthService,
    private router: Router,
    // private regService: RegistrationService,
    // private dialog: MatDialog,
    ) {
  }

  ngOnInit(): void { }

  tempLogin() {
    this.auth.checkCreditionals(this.login.value['email'], this.login.value['password'])
      .then(user => {
        this.router.navigate(['']);
      });
  }

  //Logs the patients registraion data
  // submit() {
  //   if(this.registration.controls['password1'].value === this.registration.controls['password2'].value){
  //     try {
  //       this.regService.createPatient(this.registration.value['email'], this.registration.value['password1'], ('+1' + this.registration.value['phone'])).then((result) => {
  //         console.log(result)
  //       })
  //     } catch (e) {
  //       this.EmailInUse = true;
  //     }
  //   }
  //   else{
  //     this.passwordsMatch = false;
  //   }
  // }

  // openDialog(): void{
  //   const dialogRef = this.dialog.open(PrivacyDialogComponent, {
  //     width: '40%',
  //     data: { privacyPolicy: this.privacyPolicy }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.privacyPolicy = result;
  //     if(this.privacyPolicy){
  //       this.submit();
  //     }
  //   });
  // }
}
