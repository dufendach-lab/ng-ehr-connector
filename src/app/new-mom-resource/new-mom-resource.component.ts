
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GravidasService } from '../gravidas.service';

@Component({
  selector: 'app-new-mom-resource',
  templateUrl: './new-mom-resource.component.html',
  styleUrls: ['./new-mom-resource.component.scss']
})
export class NewMomResourceComponent implements OnInit{
  selectedResource = "";
  isPanelOpen: boolean = false;
  user = this.logAuth.user;
  diagnosis: string = '';

  constructor(private logAuth: AuthService,
              private gravService: GravidasService
  ) {
  }
  ngOnInit(): void {
    this.gravService.getGravidas().subscribe(grav => {
      if(grav) {
        const last = grav.length - 1;
        this.diagnosis = grav[last].Diagnosis;
      }
    })
  }

  openPDF(pdfFile: string): void {
    const fileName = pdfFile + '.pdf';
    const fileDir = '../../assets/pdfs/' + fileName;
    window.open(fileDir);
  }
}
