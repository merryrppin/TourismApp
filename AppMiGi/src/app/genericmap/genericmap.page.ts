import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { Platform, LoadingController, ToastController } from "@ionic/angular";
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

declare var google;
@Component({
  selector: 'app-genericmap',
  templateUrl: './genericmap.page.html',
  styleUrls: ['./genericmap.page.scss'],
})
export class GenericmapPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  constructor( 
    private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,) { 
    }

  ngOnInit() {
    var objThis = this;
    setTimeout(function(){
      objThis.loadMap();   
    }, 2000);
  }
  loadMap() {
    let latLng = new google.maps.LatLng(6.378543, -75.4464299);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      tilt: 30,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,

      clickableIcons: false,
      mapToolbar: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    // this.geolocation.getCurrentPosition()
    // .then((resp) => {
    //   let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   } 
      
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
    //   this.map.addListener('tilesloaded', () => {
    //     console.log('accuracy',this.map, this.map.center.lat());
    //     this.lat = this.map.center.lat()
    //     this.long = this.map.center.lng()
    //   }); 
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

}
