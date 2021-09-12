import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, Renderer2, ViewChild, OnInit } from '@angular/core';
import { SyncService } from 'src/app/core/sync/sync.service';
import { CulturaGeneralMunicipio } from 'src/app/data/models/culturageneralmunicipio';
import { DataAcordeon } from 'src/app/data/models/dataacordeon';
import { SitioTuristico } from 'src/app/data/models/sitioturistico';
import { GeneralService } from '../../core/General/general.service';

import { Geolocation, WatchPositionCallback } from '@capacitor/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  // Map related
  @ViewChild('map_canvas') mapElement: ElementRef;
  map: any;
  loading: any;
  markers = [];

  idioma: string = "ESP"; //TEST 
  idMunicipio: number = 1; //Girardota

  currentMarkerPosition: google.maps.LatLng = null;

  datosMunicipio: CulturaGeneralMunicipio[];
  datosSitioTuristico: DataAcordeon[];
  aSitiosTuristicos: SitioTuristico[];
  aSitiosTuristicosUnique: SitioTuristico[];

  constructor(
    private generalService: GeneralService,
    private syncService: SyncService,
    private locationAccuracy: LocationAccuracy) { }

  dibujarSitiosTuristicos(objThis: any) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
    this.aSitiosTuristicosUnique.forEach(function (objSitioTuristico) {
      let latLng: google.maps.LatLng = new google.maps.LatLng(objSitioTuristico.Latitud, objSitioTuristico.Longitud);

      let marker = new google.maps.Marker({
        map: objThis.map,
        animation: google.maps.Animation.DROP,//BOUNCE
        position: latLng,
        icon: objSitioTuristico.IconoMarcador
      });

      marker.addListener("click", () => {
        let aSitiosTuristicos = objThis.aSitiosTuristicos.filter(obj => obj.IdSitioTuristico === objSitioTuristico.IdSitioTuristico);
        let pr = aSitiosTuristicos.map(o => ({
          Nombre: o.Titulo,
          NombreENG: o.TituloENG,
          ValorESP: o.DescripcionESP,
          ValorENG: o.DescripcionENG,
          Imagen: o.Imagen,
          Orden: o.Orden
        }))

        objThis.datosSitioTuristico = pr;
        objThis.currentMarkerPosition = marker.get('position');
      });

      objThis.markers.push(marker);
    });
  }

  async cargarSitiosTuristicos() {
    let data = await this.syncService.descargarDatos()
    let jsonRows = data.value[0].rows;
    let jsonColumns = data.value[0].columns;
    this.aSitiosTuristicos = this.arrayMap(jsonRows, jsonColumns);
    this.aSitiosTuristicosUnique = this.aSitiosTuristicos.filter((objSitioTuristico, i, aSitioTuristico) => aSitioTuristico.findIndex(t => t.IdSitioTuristico === objSitioTuristico.IdSitioTuristico) === i);

    this.dibujarSitiosTuristicos(this);
  }


  async initiliazeCurrentPosition() {
    await Geolocation.getCurrentPosition()
      .then((response) => {
        let coordinate: google.maps.LatLng = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,//BOUNCE
          position: coordinate,
          icon: "https://webflowers-wmalpha-rf.azurewebsites.net/Images/user.png"
        });

        let positionOptions: PositionOptions = { enableHighAccuracy: true };
        let watchPostion: WatchPositionCallback = (position, err) => {
          let userLatLng: google.maps.LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.moveUserMarker(userLatLng);
        };
        let watch = Geolocation.watchPosition(positionOptions, watchPostion);
      })
      .catch((err) => {
        this.validateIfGPSIsEnabled();
      });

  }

  moveUserMarker(userLatLng: google.maps.LatLng) {

  }

  async cargarDatosMunicipio() {
    let data = await this.syncService.descargarDatosMunicipio();
    this.datosMunicipio = this.arrayMap(data.value[0].rows, data.value[0].columns);

    let objData: DataAcordeon = new DataAcordeon();
    objData.Nombre = this.datosMunicipio[0].NombreMunicipio;
    objData.NombreENG = this.datosMunicipio[0].NombreMunicipio;
    objData.ValorESP = this.datosMunicipio[0].ValorESP;
    objData.ValorENG = this.datosMunicipio[0].ValorENG;
    objData.Imagen = this.datosMunicipio[0].Imagen;
    objData.Orden = this.datosMunicipio[0].Orden;
    this.datosSitioTuristico = [objData]
  }

  async localizar() {
    await this.openLoading();
    this.currentMarkerPosition = null;
    try {
      await this.cargarSitiosTuristicos();
      await this.initiliazeCurrentPosition();
    } catch { }
    this.loading.dismiss();
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: "por favor espere...",
      keyboardClose: false
    });
  }

  routePath: google.maps.Polyline = null;

  drawLineMap(coordinates: google.maps.LatLng[]) {
    this.routePath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#1e315a",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    this.routePath.setMap(this.map);
  }

  drawRoute(route: any, objThis: any) {
    if (this.routePath != null)
      this.routePath.setMap(null);
    let coordinates: google.maps.LatLng[] = [];
    let origin: google.maps.LatLng;
    let destination: google.maps.LatLng;
    let routePoints: any[] = route.routes[0].legs[0].steps;
    routePoints.forEach(function (objRoutePoint) {
      let aPath: any[] = objRoutePoint.path;
      aPath.forEach(function (objPath, index) {
        destination = new google.maps.LatLng(objPath.lat(), objPath.lng());
        coordinates.push(destination);
      });

    });
    this.loading.dismiss();
    objThis.drawLineMap(coordinates, objThis);
    objThis.goToCurrentLocation();
  }

  calculateAndDisplayRoute(originDirection: string, destinationDirection: string) {
    let objThis = this;
    this.directionsService.route({
      origin: originDirection,
      destination: destinationDirection,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK') {
        this.drawRoute(response, objThis);
      } else {
        this.loading.dismiss();
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  getPosition(latLng: google.maps.LatLng) {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition()
        .then((response) => {
          let destinationDirection: string = latLng.lat() + ', ' + latLng.lng();
          let originDirection: string = response.coords.latitude + ', ' + response.coords.longitude;
          this.calculateAndDisplayRoute(originDirection, destinationDirection);
        })
        .catch((err) => {
          this.validateIfGPSIsEnabled();
        });
    };
    printCurrentPosition();
  }

  async drawRouteFromMarker() {
    await this.openLoading();
    this.getPosition(this.currentMarkerPosition);
  }

  async centerMapOnCity() {
    let latLng = new google.maps.LatLng(6.378543, -75.4464299); //Girardota
    await this.openLoading();
    this.map.setCenter(latLng);
    this.loading.dismiss();
  }

  async goToCurrentLocation() {
    await this.openLoading();
    const coordinates = await Geolocation.getCurrentPosition()
      .then((response) => {
        let coordinate: google.maps.LatLng = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
        this.map.setCenter(coordinate);
        this.loading.dismiss();
      })
      .catch((err) => {
        this.validateIfGPSIsEnabled();
      });
  }

  validateIfGPSIsEnabled(){
    debugger;
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    });
  }

  // Initialize a blank map
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
    // this.map.addListener("click", (e) => {
    //   if(e.cancelable) {
    //     e.preventDefault();
    //   }
    // });
  }


  getCurrentLanguage(): string {
    return this.generalService.getCurrentLanguage();
  }

  getCurrentLanguageESP(): boolean {
    return this.generalService.getCurrentLanguage() == "ESP";
  }

  ionViewWillEnter() {
    this.loadMap();
    this.localizar();
    this.cargarDatosMunicipio();
  }

  arrayMap(aRows: any[], aColumns: any[]): any[] {
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
}
