import {Component, Inject} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-user-confirmation-dialog',
  templateUrl: './delete-user-confirmation-dialog.component.html',
  styleUrls: ['./delete-user-confirmation-dialog.component.scss']
})
export class DeleteUserConfirmationDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string} , private afs : AngularFirestore  ) {

   }

  ngOnInit(): void {
    
  }


  //** deletes a document with the passed data */
 deleteDocument(){
  console.log(`deleting patient with UID ${this.data.id}`);
  this.afs.collection('patients').doc(this.data.id).delete();  
}

}
