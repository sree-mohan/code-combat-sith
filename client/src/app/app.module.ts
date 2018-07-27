import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule, ModalModule } from 'ngx-bootstrap';
import { MatCheckboxModule } from '@angular/material';
import { TypeaheadModule } from 'ngx-type-ahead';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DataService } from './services/data.service';

import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecruiterHomeComponent } from './pages/recruiter-home/recruiter-home.component';
import { RecruiterListComponent } from './pages/recruiter-list/recruiter-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    RecruiterHomeComponent,
    RecruiterListComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TypeaheadModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 