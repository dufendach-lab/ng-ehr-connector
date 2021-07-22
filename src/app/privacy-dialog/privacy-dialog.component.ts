import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss']
})
export class PrivacyDialogComponent implements OnInit {

  bottomCheck = false;
  constructor(
    public dialogRef: MatDialogRef<PrivacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.bottomCheck = true;
    }
  }

  onNoClick(): void {
    this.data.privacyPolicy = false;
    this.dialogRef.close(this.data.privacyPolicy);
  }

  onYesClick(): void {
    this.data.privacyPolicy = true;
    this.dialogRef.close(this.data.privacyPolicy);
  }

  ngOnInit(): void {
  }

}
