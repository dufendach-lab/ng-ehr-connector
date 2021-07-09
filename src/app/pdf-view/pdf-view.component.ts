import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerComponent  }from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {

  pdfFile: string = "";
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  fileSource = "";

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((routeParams) => {
      const nav = (routeParams.get('file') == '' || routeParams.get('file')==null) ? "" : routeParams.get('file');
      this.pdfFile = (nav == null || nav == "") ? "bad" : nav;
      console.log(this.pdfFile);
      if(this.pdfFile != "bad"){
        this.fileSource = "../../assets/pdfs/" + this.pdfFile + ".pdf";
      }
    })
  }

  download_Clicked(): void {
    const fileName = this.pdfFile + '.pdf';
    const fileDir = '../../assets/pdfs/' + fileName;
    const link = document.createElement('a');
    link.setAttribute('target', '_self');
    link.setAttribute('href', fileDir);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
