import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-pollicy',
  templateUrl: './privacy-pollicy.component.html',
  styleUrls: ['./privacy-pollicy.component.scss']
})
export class PrivacyPollicyComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}) { }

  ngOnInit(): void {
  }

}
