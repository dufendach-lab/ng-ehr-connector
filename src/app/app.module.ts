import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatChipsModule} from '@angular/material/chips'
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PatientInfoComponent} from './patient-info/patient-info.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PatientDataComponent} from './patient-data/patient-data.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ObsValueListComponent} from './obs-value-list/obs-value-list.component';
import {MainFormComponent} from './main-form/main-form.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthorizeComponent} from './authorize/authorize.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import { LandingInfoComponent } from './landing-info/landing-info.component';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule, } from '@angular/fire/auth';

import { TestPatientDataComponent } from './test-patient-data/test-patient-data.component';
import { ObsValueDisplayComponent } from './obs-value-display/obs-value-display.component';
import { LaunchComponent } from './launch/launch.component';
import { NavContainerComponent } from './nav-container/nav-container.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import {MatDividerModule} from "@angular/material/divider";
import { GraphDataComponent } from './graph-data/graph-data.component';
import { DataTableComponent } from './data-table/data-table.component';
import { GravidasDetailEditorComponent } from './gravidas-detail-editor/gravidas-detail-editor.component';
import { GravidasViewerComponent } from './gravidas-viewer/gravidas-viewer.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { NewMomResourceComponent } from './new-mom-resource/new-mom-resource.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { PdfViewerModule }from 'ng2-pdf-viewer';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YtPlayerComponent } from './yt-player/yt-player.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserListComponent } from './user-list/user-list.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PatientsTableComponent } from './patients-table/patients-table.component';
import { DeleteUserConfirmationDialogComponent } from './delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { PregnancyEditorComponent } from './pregnancy-editor/pregnancy-editor.component';
import { PregnancyEditorDialogComponent } from './pregnancy-editor-dialog/pregnancy-editor-dialog.component';
import { ConfirmEditDialogComponent } from './confirm-edit-dialog/confirm-edit-dialog.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { PrivacyPollicyComponent } from './privacy-pollicy/privacy-pollicy.component';




@NgModule({
  declarations: [
    AppComponent,
    PatientInfoComponent,
    NavbarComponent,
    PatientDataComponent,
    DashboardComponent,
    ObsValueListComponent,
    RegistrationComponent,
    AuthorizeComponent,
    ObsValueListComponent,
    MainFormComponent,
    LandingComponent,
    LoginComponent,
    LandingInfoComponent,
    TestPatientDataComponent,
    ObsValueDisplayComponent,
    LaunchComponent,
    NavContainerComponent,
    GraphDataComponent,
    DataTableComponent,
    GravidasDetailEditorComponent,
    GravidasViewerComponent,
    PatientSearchComponent,
    NewMomResourceComponent,
    ConfirmationDialogComponent,
    PdfViewComponent,
    YtPlayerComponent,
    AdminListComponent,
    PrivacyDialogComponent,
    ResetPasswordComponent,
    ContactFormComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
    AdminNavComponent,
    UserNavComponent,
    UserListComponent,
    PatientsTableComponent,
    DeleteUserConfirmationDialogComponent,
    PregnancyEditorComponent,
    PregnancyEditorDialogComponent,
    ConfirmEditDialogComponent,
    FeedbackDialogComponent,
    PrivacyPollicyComponent,

 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    PdfViewerModule,
    YouTubePlayerModule,

    // Material imports
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatRadioModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatTableModule,
    MatTooltipModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
