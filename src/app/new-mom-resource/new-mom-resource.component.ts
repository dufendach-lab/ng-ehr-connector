
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-mom-resource',
  templateUrl: './new-mom-resource.component.html',
  styleUrls: ['./new-mom-resource.component.scss']
})
export class NewMomResourceComponent {
  selectedResource = "";
  isPanelOpen: boolean = false;

  constructor() { }

  openPDF(pdfFile: string): void {
    const fileName = pdfFile + '.pdf';
    const fileDir = '../../assets/pdfs/' + fileName;
    window.open(fileDir);
  }
}
