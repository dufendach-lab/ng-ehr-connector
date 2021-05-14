import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientInfoComponent} from "./patient-info/patient-info.component";

const routes: Routes = [
  {
    path: 'landing',
    component: PatientInfoComponent,
  },
  {
    path: 'dashboard',
    component: PatientInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
