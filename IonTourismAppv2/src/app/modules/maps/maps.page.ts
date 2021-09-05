import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, Renderer2, ViewChild, OnInit } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { CulturaGeneralMunicipio } from 'src/app/data/models/culturageneralmunicipio';
import { DataAcordeon } from 'src/app/data/models/dataacordeon';
import { SitioTuristico } from 'src/app/data/models/sitioturistico';
import { GeneralService } from '../../core/General/general.service';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LatLng,
  MarkerOptions,
  Polyline,
  PolylineOptions
} from "@ionic-native/google-maps";
import { SyncService } from 'src/app/core/sync/sync.service';
import { Platform } from '@ionic/angular';
// import { Geolocation as Geoc, Geoposition } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit{

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  ngOnInit(){
    this.cargarDatosMunicipio();
  }

  idioma: string = "ESP"; //TEST 
  idMunicipio: number = 1; //Girardota
  //map: GoogleMap;
  loading: any;
  datosMunicipio: CulturaGeneralMunicipio[];
  datosSitioTuristico: DataAcordeon[];
  aSitiosTuristicos: SitioTuristico[];
  initialMapLoad: boolean = false;
  aSitiosTuristicosUnique: SitioTuristico[];

  markerUser: Marker;
  currentMarkerPosition: LatLng = null;

  @Input('apiKey') apiKey: string;
  public map: GoogleMap;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  private networkHandler = null;

  @ViewChild('map_canvas') mapView: ElementRef;
  constructor(
    private platform: Platform,
    //private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document
    private syncService:SyncService, 
    private generalService: GeneralService,
    // private geolocation: Geoc
  ) {
  }

  getCurrentLanguageESP(): boolean {
    return this.generalService.getCurrentLanguage() == "ESP";
  }

  getCurrentLanguage(): string {
    return this.generalService.getCurrentLanguage();
  }



  async cargarDatosMunicipio(){
    let data = await this.syncService.descargarDatosMunicipio();
    this.datosMunicipio = this.arrayMap(data.value[0].rows,data.value[0].columns);

    let objData : DataAcordeon = new DataAcordeon();
    objData.Nombre = this.datosMunicipio[0].NombreMunicipio;
    objData.NombreENG = this.datosMunicipio[0].NombreMunicipio;
    objData.ValorESP = this.datosMunicipio[0].ValorESP;
    objData.ValorENG = this.datosMunicipio[0].ValorENG;
    objData.Imagen = this.datosMunicipio[0].Imagen;
    objData.Orden = this.datosMunicipio[0].Orden;
    this.datosSitioTuristico = [objData]
  }

  initiliazeCurrentPosition(){
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //   let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
  
    //   let markerOptions: MarkerOptions = {
    //     clickable : false,
    //     disableAutoPan: true,
    //     position: latLng,
    //     animation: GoogleMapsAnimation.BOUNCE,
    //     icon: "https://webflowers-wmalpha-rf.azurewebsites.net/Images/user.png"
    //   };

    //   this.markerUser = this.map.addMarkerSync(markerOptions);
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data: any) => {
    //   let latLng: LatLng = new LatLng(data.coords.latitude, data.coords.longitude);
    //   this.markerUser.setPosition(latLng);
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
  }

  async localizar() {
    const loading = await this.generalService.presentLoading({
      message: "por favor espere...",
      keyboardClose: false
    });
    this.currentMarkerPosition = null;
    loading.present();
    await this.cargarSitiosTuristicos();
    this.initiliazeCurrentPosition();
    loading.dismiss();   
  }

  async cargarSitiosTuristicos() {
    debugger;
    let data = await this.syncService.descargarDatos()
    let jsonRows  = data.value[0].rows;
    let jsonColumns  = data.value[0].columns;    
    this.aSitiosTuristicos = this.arrayMap(jsonRows, jsonColumns);
    this.aSitiosTuristicosUnique = this.aSitiosTuristicos.filter((objSitioTuristico, i, aSitioTuristico) => aSitioTuristico.findIndex(t => t.IdSitioTuristico === objSitioTuristico.IdSitioTuristico) === i);

    await this.dibujarSitiosTuristicos(this);
  }

  arrayMap(aRows: any[], aColumns: any[]):any[] {
    let aData: object[] = [];
    aRows.forEach(function (aRows) {
      let objData = {};
      aColumns.forEach(function (objColumn, indexColumn) {
        objData[objColumn] = aRows[indexColumn];
      });
      aData.push(objData);
    });
    return aData;
  }

  dibujarSitiosTuristicos(objThis:any) {
    this.aSitiosTuristicosUnique.forEach(function (objSitioTuristico) {
      let latLng: LatLng = new LatLng(objSitioTuristico.Latitud, objSitioTuristico.Longitud);
  
      let markerOptions: MarkerOptions = {
        title: objSitioTuristico.NombreSitioTuristicoESP,
        position: latLng,
        animation: GoogleMapsAnimation.BOUNCE,
        SitioTuristico : objSitioTuristico,
        icon: objSitioTuristico.IconoMarcador
      };
debugger;
      CapacitorGoogleMaps.addMarker({
        latitude: parseFloat(objSitioTuristico.Latitud.toString()),
        longitude: parseFloat(objSitioTuristico.Longitud.toString()),
        title: objSitioTuristico.NombreSitioTuristicoESP,
        snippet: "",
        // animation: GoogleMapsAnimation.BOUNCE,
        // SitioTuristico : objSitioTuristico,
        // icon: objSitioTuristico.IconoMarcador
        // snippet: "Custom Snippet",
      });
      
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params: any) => {
      //   objThis.datosSitioTuristico = []
      //   let marker: Marker = <Marker>params[1];
      //   let SitioTuristico: SitioTuristico = marker.get('SitioTuristico');
      //   let aSitiosTuristicos = objThis.aSitiosTuristicos.filter(obj=> obj.IdSitioTuristico === SitioTuristico.IdSitioTuristico);
      //   let objData : DataAcordeon = new DataAcordeon();
      //   let pr = aSitiosTuristicos.map(o=>({
      //     Nombre:o.Titulo,
      //     NombreENG:o.TituloENG,
      //     ValorESP:o.DescripcionESP,
      //     ValorENG:o.DescripcionENG,
      //     Imagen:o.Imagen,
      //     Orden:o.Orden
      //   }))
     
      //   objThis.datosSitioTuristico = pr;
      //   objThis.currentMarkerPosition = marker.get('position');
      //   objThis.zone.run(() => {});
      // });
    });
  }

  calculateAndDisplayRoute(originDirection: string, destinationDirection: string) {
    let objThis = this;
    this.directionsService.route({
      origin: originDirection,
      destination: destinationDirection,
      // travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.drawRoute(response, objThis);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  drawRoute(route: any, objThis: any){
    this.map.clear();
    this.initiliazeCurrentPosition();
    this.dibujarSitiosTuristicos(this);
    let coordinates: LatLng[] = [];
    let origin: LatLng;
    let destination: LatLng;
    let routePoints: any[]= route.routes[0].legs[0].steps;
    routePoints.forEach(function (objRoutePoint) {
      let aPath: any[] = objRoutePoint.path;
      aPath.forEach(function(objPath, index){
        destination = new LatLng(objPath.lat(), objPath.lng());
        coordinates.push(new LatLng(destination.lat, destination.lng));
      });

    });
    objThis.drawLineMap(coordinates, objThis);
  }

  drawLineMap(coordinates: LatLng[], objThis: any){
    let optionsPolyline: PolylineOptions = {
      points: coordinates,
      color: '#1e315a'
    };
    this.map.addPolyline(optionsPolyline);
  }

  drawRouteFromMarker(){
    this.getPosition(this.currentMarkerPosition);
  }

  getPosition(latLng: LatLng){
    // this.geolocation.getCurrentPosition()
    // .then(data => {
    //   let destinationDirection : string = latLng.lat+', '+latLng.lng;
    //   let originDirection : string = data.coords.latitude+', '+data.coords.longitude;
    //   this.calculateAndDisplayRoute(originDirection, destinationDirection);
    // })
    // .catch(error =>{
    //   console.log(error);
    // })
  }

  async ionViewDidEnter() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: 6.378543,
      longitude: -75.4464299,
      zoom: 15
    });

    var objThis = this;

    CapacitorGoogleMaps.addListener("onMapReady", async function () {
      objThis.localizar();

      CapacitorGoogleMaps.setMapType({
        "type": "normal"
      })
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

}
