import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginPageComponent } from './login-page/login-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/components/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { StudentGroupsPageComponent } from './student-groups-page/student-groups-page.component';
import {AuthGuard} from './shared/services/auth.guard';
import {MatTableModule} from '@angular/material/table';
import { StudentListPageComponent } from './student-list-page/student-list-page.component';
import {MatSortModule} from '@angular/material/sort';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { ConsultationsPageComponent } from './consultations-page/consultations-page.component';
import {MatStepperModule} from '@angular/material/stepper';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginPageComponent,
    StudentGroupsPageComponent,
    StudentListPageComponent,
    TeachersPageComponent,
    ConsultationsPageComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        AppRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatOptionModule,
        MatSelectModule,
        MatStepperModule
    ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
