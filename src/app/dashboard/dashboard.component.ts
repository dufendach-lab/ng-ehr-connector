import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  patient = this.ps.patient.pipe(filter(p => p !== null && p !== undefined)); // create patient

  constructor(private ps: PatientService) {

    this.patient.subscribe(pt => console.log(pt))

  }

}
