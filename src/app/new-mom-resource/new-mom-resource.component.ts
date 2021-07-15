
import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-new-mom-resource',
  templateUrl: './new-mom-resource.component.html',
  styleUrls: ['./new-mom-resource.component.scss']
})
export class NewMomResourceComponent {
  selectedResource = "";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  openPDF(pdfFile: string): void {
    const fileName = pdfFile + '.pdf';
    const fileDir = '../../assets/pdfs/' + fileName;
    window.open(fileDir);
  }


}
