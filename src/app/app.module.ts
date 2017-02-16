import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

import { GooglePlaceModule } from '../../bower_components/angular2-google-map-auto-complete/directives/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    GooglePlaceModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
