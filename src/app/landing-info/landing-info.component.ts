import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { IRegistration } from '../../Interfaces/IRegistration'

@Component({
  selector: 'app-landing-info',
  templateUrl: './landing-info.component.html',
  styleUrls: ['./landing-info.component.scss']
})
export class LandingInfoComponent implements OnInit {

  constructor(private regService: RegistrationService) { }

  registrationInfo = {} as IRegistration
  ngOnInit(): void {
    this.getRegistrationInfo();
  }

  getRegistrationInfo(): void{
    this.registrationInfo = this.regService.user;
  }

}
