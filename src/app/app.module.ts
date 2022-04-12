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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PatientInfoComponent} from './components/patient components/patient-info/patient-info.component';
import {PatientDataComponent} from './components/patient components/patient-data/patient-data.component';
import {DashboardComponent} from './components/patient components/dashboard/dashboard.component';
import {ObsValueListComponent} from './components/patient components/obs-value-list/obs-value-list.component';
import {MainFormComponent} from './components/patient components/main-form/main-form.component';
import {RegistrationComponent} from './components/core components/registration/registration.component';
import {AuthorizeComponent} from './components/patient components/authorize/authorize.component';
import {LandingComponent} from './components/patient components/landing/landing.component';
import {LoginComponent} from './components/core components/login/login.component';

import {environment} from '../environments/environment';
import {ObsValueDisplayComponent} from './components/patient components/obs-value-display/obs-value-display.component';
import {LaunchComponent} from './launch/launch.component';
import {NavContainerComponent} from './components/patient components/nav-container/nav-container.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatDividerModule} from "@angular/material/divider";

import {GraphDataComponent} from './components/patient components/graph-data/graph-data.component';
import {DataTableComponent} from './components/patient components/data-table/data-table.component';
import {GravidasDetailEditorComponent} from './components/staff components/gravidas-detail-editor/gravidas-detail-editor.component';
import {GravidasViewerComponent} from './components/staff components/gravidas-viewer/gravidas-viewer.component';
import {PatientSearchComponent} from './components/staff components/patient-search/patient-search.component';
import {NewMomResourceComponent} from './components/patient components/new-mom-resource/new-mom-resource.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {YtPlayerComponent} from './components/patient components/yt-player/yt-player.component';

import { StaffLandingComponent } from './components/staff components/staff-landing/staff-landing.component';
import { PatientNewComponent } from './components/staff components/patient-new/patient-new.component';

import {AdminListComponent} from './components/staff components/admin-list/admin-list.component';
import {ResetPasswordComponent} from './components/core components/reset-password/reset-password.component';
import {ContactFormComponent} from './components/patient components/contact-form/contact-form.component';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {WINDOW_PROVIDERS} from "./util/window-provider";
import { ToolsPageComponent } from './components/patient components/tools-page/tools-page.component';
import { ResourcesDiagnosisComponent } from './components/patient components/resources-diagnosis/resources-diagnosis.component';
import { PatientEditComponent } from './components/patient components/patient-edit/patient-edit.component';
import { StaffContainerComponent } from './components/staff components/staff-container/staff-container.component';
import { PatientStateComponent } from './components/patient components/patient-state/patient-state.component';
import { ResourcesInfoPaneComponent } from './components/patient components/resources-info-pane/resources-info-pane.component';
import { ResourcesPregnantComponent } from './components/patient components/resources-pregnant/resources-pregnant.component';
import { ResourcesDeliveredComponent } from './components/patient components/resources-delivered/resources-delivered.component';
import { PatientStateNewComponent } from './components/patient components/patient-state-new/patient-state-new.component';
import { InfantCardsComponent } from './components/patient components/infant-cards/infant-cards.component';
import { StateColorPipe } from './state-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PatientInfoComponent,
    PatientDataComponent,
    DashboardComponent,
    ObsValueListComponent,
    RegistrationComponent,
    AuthorizeComponent,
    ObsValueListComponent,
    MainFormComponent,
    LandingComponent,
    LoginComponent,
    ObsValueDisplayComponent,
    LaunchComponent,
    NavContainerComponent,
    GraphDataComponent,
    DataTableComponent,
    GravidasDetailEditorComponent,
    GravidasViewerComponent,
    PatientSearchComponent,
    NewMomResourceComponent,
    YtPlayerComponent,
    AdminListComponent,
    ResetPasswordComponent,
    ContactFormComponent,
    StaffLandingComponent,
    PatientNewComponent,
    ToolsPageComponent,
    ResourcesDiagnosisComponent,
    PatientEditComponent,
    StaffContainerComponent,
    PatientStateComponent,
    ResourcesInfoPaneComponent,
    ResourcesPregnantComponent,
    ResourcesDeliveredComponent,
    PatientStateNewComponent,
    InfantCardsComponent,
    StateColorPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonToggleModule,


  AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
