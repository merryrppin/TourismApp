import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Geolocation as Geoc, Geoposition } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
    providers: [BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geoc],
  bootstrap: [AppComponent],
})
export class AppModule {}
