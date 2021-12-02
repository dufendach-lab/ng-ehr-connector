import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { GravidasService } from '../gravidas.service';
import { IGravidasDetails } from 'src/Interfaces/IGravidasDetails';
import { ConfirmEditDialogComponent } from '../confirm-edit-dialog/confirm-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pregnancy-editor',
  templateUrl: './pregnancy-editor.component.html',
  styleUrls: ['./pregnancy-editor.component.scss']
})
export class PregnancyEditorComponent implements OnInit {
  @Input() patientId: string | null | undefined;
  title: any;
  
  constructor( private fb: FormBuilder, private gs : GravidasService,  public dialog: MatDialog,) { 

  }


  isNewPregnancy = true;
  ngOnInit(): void {
    if(this.patientId){// getting the array of gravidas , and accessed the first element only (use diffrent logic if needed.) 
      this.gs.getOtherGravidas(this.patientId).subscribe(gr => {
        console.log(gr)
        this.pregnancyForm.get('EstDueDate')?.setValue(gr[0].EstDueDate);
        this.pregnancyForm.get('Diagnosis')?.setValue(gr[0].Diagnosis);
        this.pregnancyForm.get('hospital')?.setValue(gr[0].hospital);
        this.pregnancyForm.get('parity')?.setValue(gr[0].parity);
        this.title = gr[0].gravidasTitle

      })
        
    }
  }

  pregnancyForm = this.fb.group({
    EstDueDate:['',Validators.required],
    Diagnosis:['',Validators.required],
    hospital:['', Validators.required],
    parity:['',Validators.pattern("^[0-9]*$")], 
    givenBirth:true,

  })

  async onSave(){
    const form = this.pregnancyForm.value; 
    
    const gravida : IGravidasDetails = { 
      EstDueDate : form.EstDueDate,
      Diagnosis : form.Diagnosis,
      hospital : form.hospital,
      parity : form.parity,
      givenBirth: form.givenBirth,
      gravidasTitle: this.title
    };

    if(this.patientId){
      await this.gs.EditOtherGravidas(gravida,this.patientId)
    }
  }

  // closeDialog(){
  //   if(this.pregnancyForm.dirty){
  //     const confirmDialogRef = this.dialog.open(ConfirmEditDialogComponent);
  //     confirmDialogRef.afterClosed().subscribe(res => {
  //       if(res ==='save'){
  //         document.getElementById("save")?.click() 
  //       }
  //       else{
  //         document.getElementById("cancel")?.click()
  //       }
  //     })
  //   }
  // }
}
