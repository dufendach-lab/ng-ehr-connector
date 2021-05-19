import { Component, Inject, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  patient = this.ps.patient.pipe(filter(p => p !== null && p !== undefined));

  constructor(private ps: PatientService) { }

  ngOnInit(): void {
  }

  logout() {
    console.warn('Implement logout functionality.');
  }

}
