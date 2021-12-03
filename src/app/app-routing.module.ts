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
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserRouteGuard } from './user-route.guard';
import { RouteGuardService } from './route-guard.service';
import { normalize } from 'path';
import { LaunchComponent } from './launch/launch.component';
import { UserListComponent } from './user-list/user-list.component';
import { PatientsTableComponent } from './patients-table/patients-table.component';
import { PrivacyPollicyComponent } from './privacy-pollicy/privacy-pollicy.component';


/**
 * base: {
 *   landing
 *   about
 *   contactUs
 *   user { [ route guard ]
 *     dashboard
 *     preg_info
 *   }
 *   admin { [ route guard protected ]
 *     edit-users
 *   }
 * }
 */

// ehr-connector.web.app/ {}


const routes: Routes = [
  {
    path: '',
    pathMatch : 'full', 
    component : LaunchComponent
  },

 

  {
    path: 'about',
    component: AboutComponent , 
    
    
    
  },

  {
    path: 'contactUs',
    component: ContactUsComponent , 
    
    
  },
  {
    path: 'privacy',
    component: PrivacyPollicyComponent , 
    
    
  },


  {
    path: 'u',
    component: NavContainerComponent,
    canActivate : [UserRouteGuard],

    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full' , 
        
       
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        
      },
      {
        path: 'survey',
        component: MainFormComponent , 
        
      },
      {
        path: 'contact',
        component: ContactFormComponent , 
        
      },
      {
        path: 'privacy',
        component: PrivacyDialogComponent,
        
      },
      {
        path: 'authorize',
        component: AuthorizeComponent,
        
      },
      {
        path: 'landing',
        component: LandingComponent,
        
      },
      {
        path: 'gravidas',
        component: GravidasViewerComponent,
        
      },
      {
        path: 'gravidas/edit',
        component: GravidasDetailEditorComponent,
       
      },
     
      {
        path: 'resources',
        component: NewMomResourceComponent ,
        
      },
      {
        path: 'resources/pdf/:file',
        component: PdfViewComponent,
        
      },

      
      

    ]
  },

// Admin routes 

{
  path: 'admin',
  component: NavContainerComponent,
  // canActivate : [RouteGuardService], 
  children : [

    {
      path: 'patients',
      component: PatientsTableComponent,
      
    },
     // TODO: Only allow admin access for search
     {
      path: 'patient/:id',
      component: PatientSearchComponent,
      
    },
    // TODO: Only allow admin access for search
    {
      path: 'adminlist',
      component: AdminListComponent,
      
    },
    {
      path: 'userlist',
      component: UserListComponent,
      
    },
    // TODO: Only allow admin access for search
    {
      path: 'patient/edit/:id',
      component: GravidasViewerComponent,
      
    },
    // TODO: Only allow admin access for search
    {
      path: 'patient/gravida/',
      component: GravidasDetailEditorComponent,
      
    },
  ]

},








  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
