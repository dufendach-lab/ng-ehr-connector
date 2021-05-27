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

  constructor(//public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private router: Router,
    //private dialog: MatDialog,
    private RegAuth: AuthService,
    //@Inject(MAT_DIALOG_DATA)
    //public data: DialogData,
    private auth: AuthService,) { }

  ngOnInit(): void {
    this.RegAuth.user.subscribe();
  }

  onCancel(): void {
    //this.dialogRef.close();
  }
  onSubmit(): void{
    this.RegAuth.checkCreditionals(this.loginData.username, this.loginData.password).then(_ =>
      //this.dialogRef.close()
      console.log('success')
    );
    //if(this.RegAuth.user.
    // if(this.loginData.username == 'mom' && this.loginData.password == 'password'){
    //   this.dialogRef.close();
    //   this.router.navigateByUrl('/landing');
    //   this.RegAuth.setLoginAuth('true');
    // }
    // else{
    //   this.incorrectLogin = true;
    // }
  }



  onRegister(): void{
    // this.dialog.closeAll();
    // const dialogRef = this.dialog.open(RegistrationComponent, {
    //   width: '400px',
    //   data: {},
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.email = result;
    // });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }
}
