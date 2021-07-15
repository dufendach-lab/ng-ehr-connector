import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-mom-resource',
  templateUrl: './new-mom-resource.component.html',
  styleUrls: ['./new-mom-resource.component.scss']
})
export class NewMomResourceComponent implements OnInit {

  selectedResource = "";

  constructor() { }

  ngOnInit(): void {
  }

  openPDF(pdfFile: string): void {
    const fileName = pdfFile + '.pdf';
    const fileDir = '../../assets/pdfs/' + fileName;
    window.open(fileDir);
  }

}
