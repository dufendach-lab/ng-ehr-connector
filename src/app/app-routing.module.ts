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
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import {StaffLandingComponent} from "./staff-landing/staff-landing.component";
import {RouteGuardService} from "./route-guard.service";
import {PatientGuardService} from "./patient-guard.service";
import {LaunchComponent} from "./launch/launch.component";
import {PatientNewComponent} from "./patient-new/patient-new.component";

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
        path: 'staff/landing',
        component: StaffLandingComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'patient/:id',
        component: PatientSearchComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'new/patient',
        component: PatientNewComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'admin-list',
        component: AdminListComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'patient/edit/:id',
        component: GravidasViewerComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'patient/gravida/add/:id',
        component: GravidasDetailEditorComponent,
        canActivate: [RouteGuardService]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [PatientGuardService]
      },
      {
        path: 'survey',
        component: MainFormComponent
      },
      {
        path: 'contact',
        component: ContactFormComponent
      },
      {
        path: 'privacy',
        component: PrivacyDialogComponent
      },
      {
        path: 'authorize',
        component: AuthorizeComponent
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
        component: NewMomResourceComponent
      },
      {
        path: 'resources/pdf/:file',
        component: PdfViewComponent
      },
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
