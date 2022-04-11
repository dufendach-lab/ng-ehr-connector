import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeComponent} from './authorize/authorize.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingComponent} from './landing/landing.component';
import {MainFormComponent} from './main-form/main-form.component';
import {NavContainerComponent} from "./nav-container/nav-container.component";
import { GravidasDetailEditorComponent } from './gravidas-detail-editor/gravidas-detail-editor.component';
import { GravidasViewerComponent } from './gravidas-viewer/gravidas-viewer.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { NewMomResourceComponent } from './new-mom-resource/new-mom-resource.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {StaffLandingComponent} from "./staff-landing/staff-landing.component";
import {RouteGuardService} from "./route-guard.service";
import {PatientGuardService} from "./patient-guard.service";
import {LaunchComponent} from "./launch/launch.component";
import {PatientNewComponent} from "./patient-new/patient-new.component";
import {ToolsPageComponent} from "./tools-page/tools-page.component";
import {PatientEditComponent} from "./patient-edit/patient-edit.component";
import {StaffContainerComponent} from "./staff-container/staff-container.component";

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
