import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-edit-dialog',
  templateUrl: './confirm-edit-dialog.component.html',
  styleUrls: ['./confirm-edit-dialog.component.scss']
})
export class ConfirmEditDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string} ,){ }

  ngOnInit(): void {
  }

}
