import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ObsValueListComponent } from './obs-value-list/obs-value-list.component';
import { MainFormComponent } from './main-form/main-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizeComponent } from './authorize/authorize.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
