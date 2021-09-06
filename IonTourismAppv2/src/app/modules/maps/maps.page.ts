import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, Renderer2, ViewChild, OnInit } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { SyncService } from 'src/app/core/sync/sync.service';
import { CulturaGeneralMunicipio } from 'src/app/data/models/culturageneralmunicipio';
import { DataAcordeon } from 'src/app/data/models/dataacordeon';
import { SitioTuristico } from 'src/app/data/models/sitioturistico';
import { GeneralService } from '../../core/General/general.service';


import { Geolocation as Geoc, Geoposition } from '@ionic-native/geolocation/ngx';
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
    private geolocation: Geoc) { }


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

      marker.addListener("click", (currentMarker) => {
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


  initiliazeCurrentPosition() {
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
    const loading = await this.generalService.presentLoading({
      message: "por favor espere...",
      keyboardClose: false
    });
    this.currentMarkerPosition = null;
    // Presentamos el componente creado en el paso anterior
    loading.present();
    await this.cargarSitiosTuristicos();
    this.initiliazeCurrentPosition();
    loading.dismiss();
  }

  drawRoute(route: any, objThis: any){
    this.map.clear();
    this.initiliazeCurrentPosition();
    this.dibujarSitiosTuristicos(this);
    let coordinates: google.maps.LatLng[] = [];
    let origin: google.maps.LatLng;
    let destination: google.maps.LatLng;
    let routePoints: any[]= route.routes[0].legs[0].steps;
    routePoints.forEach(function (objRoutePoint) {
      let aPath: any[] = objRoutePoint.path;
      aPath.forEach(function(objPath, index){
        destination = new google.maps.LatLng(objPath.lat(), objPath.lng());
        coordinates.push(destination);
      });

    });
    objThis.drawLineMap(coordinates, objThis);
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

  getPosition(latLng: google.maps.LatLng) {
    this.geolocation.getCurrentPosition()
    .then(data => {
      let destinationDirection : string = latLng.lat+', '+latLng.lng;
      let originDirection : string = data.coords.latitude+', '+data.coords.longitude;
      this.calculateAndDisplayRoute(originDirection, destinationDirection);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  drawRouteFromMarker() {
    this.getPosition(this.currentMarkerPosition);
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
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log(this.map);
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
