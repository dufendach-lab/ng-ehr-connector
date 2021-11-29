import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pregnancy-editor-dialog',
  templateUrl: './pregnancy-editor-dialog.component.html',
  styleUrls: ['./pregnancy-editor-dialog.component.scss']
})
export class PregnancyEditorDialogComponent {
  readonly patientId: string | undefined
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}) { 
    this.patientId = data?.id;
  }

  ngOnInit(): void {
  }

}
