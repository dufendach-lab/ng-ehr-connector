
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IRegistration } from 'src/Interfaces/IRegistration';
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
  regInfo: Observable<IRegistration | undefined>;
  user = this.logAuth.user;
  diagnosis: string = '';

  constructor(private afs: AngularFirestore,
              private logAuth: AuthService,
              private gravService: GravidasService
  ) {
    this.regInfo = this.user.pipe(
      filter(u => u != null),
      switchMap(u => this.afs
        .collection('patients')
        .doc<IRegistration>(u?.uid)
        .get().pipe(map(doc => doc.data())))
    )
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
