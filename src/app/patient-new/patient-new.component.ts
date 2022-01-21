
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.scss']
})
export class PatientNewComponent implements OnInit {

  emailInUse = false;
  hide1 = true;
  hide2 = true;
  passwordsMatch = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  // TODO: Add functionality when staff registration workflow is complete.

  onSubmit() {
    this.router.navigate(['/admin-list']);
  }

}
