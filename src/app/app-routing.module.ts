import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeComponent} from './components/patient components/authorize/authorize.component';
import {DashboardComponent} from './components/patient components/dashboard/dashboard.component';
import {LandingComponent} from './components/patient components/landing/landing.component';
import {MainFormComponent} from './components/patient components/main-form/main-form.component';
import {NavContainerComponent} from "./components/patient components/nav-container/nav-container.component";
import { GravidasDetailEditorComponent } from './components/staff components/gravidas-detail-editor/gravidas-detail-editor.component';
import { GravidasViewerComponent } from './components/staff components/gravidas-viewer/gravidas-viewer.component';
import { PatientSearchComponent } from './components/staff components/patient-search/patient-search.component';
import { NewMomResourceComponent } from './components/patient components/new-mom-resource/new-mom-resource.component';
import { AdminListComponent } from './components/staff components/admin-list/admin-list.component';
import { ContactFormComponent } from './components/patient components/contact-form/contact-form.component';
import {StaffLandingComponent} from "./components/staff components/staff-landing/staff-landing.component";
import {RouteGuardService} from "./services/route-guard.service";
import {PatientGuardService} from "./services/patient-guard.service";
import {LaunchComponent} from "./launch/launch.component";
import {PatientNewComponent} from "./components/staff components/patient-new/patient-new.component";
import {ToolsPageComponent} from "./components/patient components/tools-page/tools-page.component";
import {PatientEditComponent} from "./components/patient components/patient-edit/patient-edit.component";
import {StaffContainerComponent} from "./components/staff components/staff-container/staff-container.component";

const routes: Routes = [
  {
    path: '',
    component: NavContainerComponent,
    canActivate: [PatientGuardService],
    children: [
      {
        path: '',
        canActivateChild: [PatientGuardService],
        children: [
          {
            path: '',
            redirectTo: 'landing',
            pathMatch: 'full',
          },
          {
            path: 'landing',
            component: LandingComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'survey',
            component: MainFormComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'contact',
            component: ContactFormComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'authorize',
            component: AuthorizeComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'edit/profile',
            component: PatientEditComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'gravidas',
            component: GravidasViewerComponent
          },
          {
            path: 'gravidas/edit',
            component: GravidasDetailEditorComponent
          },
          {
            path: 'resources',
            component: NewMomResourceComponent,
            canActivate: [PatientGuardService]
          },
          {
            path: 'tools',
            component: ToolsPageComponent,
            canActivate: [PatientGuardService]
          },
        ]
      }
    ]
  },
  {
    path: 'admin',
    component: StaffContainerComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path: '',
        canActivateChild: [RouteGuardService],
        children: [
          {
            path: '',
            redirectTo: '/admin/home',
            pathMatch: 'full',
          },
          {
            path: 'home',
            component: StaffLandingComponent,
          },
          {
            path: 'patient/add',
            component: PatientNewComponent,
          },
          {
            path: 'patient/list',
            component: AdminListComponent,
          },
          {
            path: 'patient/:id',
            component: PatientSearchComponent,
          },
          {
            path: 'patient/edit/:id',
            component: GravidasViewerComponent,
          },
          {
            path: 'patient/gravida/add/:id',
            component: GravidasDetailEditorComponent,
          },
        ]
      }
    ]
  },
  {
    path: 'launch',
    component: LaunchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
