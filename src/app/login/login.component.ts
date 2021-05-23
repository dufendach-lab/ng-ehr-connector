import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  loginData = {} as DialogData;
  incorrectLogin = false;
  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onSubmit(): void{
    if(this.loginData.username == 'Mom' && this.loginData.password == 'hunter2'){
      this.dialogRef.close();
      this.router.navigateByUrl('/authorize');
    }
    else{
      this.incorrectLogin = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }
}
