import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavController, NavParams } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import {HttpClientModule } from "@angular/common/http"

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, IonicModule],
  providers: [GooglePlus, Facebook, Geolocation, NativeGeocoder, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NavParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
