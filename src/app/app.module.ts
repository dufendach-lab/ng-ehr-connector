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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TestPatientDataComponent } from './test-patient-data/test-patient-data.component';
import { RegistrationOtherComponent } from './registration-other/registration-other.component'

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
    RegistrationOtherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    // Material imports
    MatButtonModule,
    MatCardModule,
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

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
