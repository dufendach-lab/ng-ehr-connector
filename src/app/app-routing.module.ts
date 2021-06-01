import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeComponent} from './authorize/authorize.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {MainFormComponent} from './main-form/main-form.component';
import {RegistrationComponent} from './registration/registration.component';
import {RegistrationOtherComponent} from './registration-other/registration-other.component';
import {LaunchComponent} from "./launch/launch.component";
import {NavContainerComponent} from "./nav-container/nav-container.component";

const routes: Routes = [
  {
    path: '',
    component: LaunchComponent,
    pathMatch: 'full',
  },
  {
    path: 'm',
    component: NavContainerComponent,
    children: [
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
  {
    path: 'registration/admin',
    component: RegistrationOtherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
