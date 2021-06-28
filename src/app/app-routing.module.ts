import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeComponent} from './authorize/authorize.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {MainFormComponent} from './main-form/main-form.component';
import {RegistrationComponent} from './registration/registration.component';
import {NavContainerComponent} from "./nav-container/nav-container.component";
import { GravidasDetailEditorComponent } from './gravidas-detail-editor/gravidas-detail-editor.component';
import { GravidasViewerComponent } from './gravidas-viewer/gravidas-viewer.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { NewMomResourceComponent } from './new-mom-resource/new-mom-resource.component';

const routes: Routes = [
  {
    path: '',
    component: NavContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'survey',
        component: MainFormComponent
      },
      {
        path: 'authorize',
        component: AuthorizeComponent
      },
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: 'gravidas',
        component: GravidasViewerComponent
      },
      {
        path: 'gravidas/edit',
        component: GravidasDetailEditorComponent
      },
      // TODO: Only allow admin access for search
      {
        path: 'patient/search',
        component: PatientSearchComponent
      },
      // TODO: Only allow admin access for search
      {
        path: 'patient/edit/:id',
        component: GravidasViewerComponent
      },
      // TODO: Only allow admin access for search
      {
        path: 'patient/gravida/add/:id',
        component: GravidasDetailEditorComponent
      },
      {
        path: 'resources',
        component: NewMomResourceComponent
      },
    ]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
