import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from "@angular/fire/functions";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

  Search = this.fb.group({
    EmailInput: ['', Validators.required],
  })

  constructor( private fb: FormBuilder, private func: AngularFireFunctions,) { }

  ngOnInit(): void {
  }

  onSearch_Click(){
    // console.log(this.Search.get('EmailInput')?.value);
    let message = "Click didn't update";
    try{
      const searchFunc = this.func.httpsCallable('userSearchByEmail');
      searchFunc({text: this.Search.get('EmailInput')?.value}).pipe(
        map(res => {
          message = res;
        })
      )
    } catch(err){
      console.log(err);
      console.log(message);
    }
    console.log("This shouldnt be the only message");
    console.log(message);
  }
}
