import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import { PrivacyPollicyComponent } from '../privacy-pollicy/privacy-pollicy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
 
  openFeedbackDialog(){
    const DialogRef = this.dialog.open(FeedbackDialogComponent);
  }
  openPrivacyDialog(){
    const DialogRef = this.dialog.open(PrivacyPollicyComponent );
  }
}
