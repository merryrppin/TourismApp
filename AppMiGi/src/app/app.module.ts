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

import { HttpClientModule } from "@angular/common/http"

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { Camera } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, IonicModule],
  providers: [GooglePlus, Facebook, Geolocation, NativeGeocoder, LocationAccuracy, Camera, File, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NavParams,ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule { }
