import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { Platform, LoadingController, ToastController, NavController } from "@ionic/angular";
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { GeneralService } from '../core/General/general.service';
import { SyncService } from '../core/sync/sync.service';

declare var google: any;
@Component({
  selector: 'app-genericmap',
  templateUrl: './genericmap.page.html',
  styleUrls: ['./genericmap.page.scss'],
})
export class GenericmapPage implements OnInit {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;
  itemData: any;
  categoria: string;
  lang: string;
  loading: any;
  mapType: string;
  infoWindow: any;

  currentPosition: any;
  sitiosTuristicos: any[];
  IdSitioTuristico: string;

  constructor(
    private geolocation: Geolocation,
    private syncService: SyncService,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private locationAccuracy: LocationAccuracy,
    private navController: NavController,
    private platform: Platform) {
    var objThis = this;
    this.lang = this.generalService.getCurrentLanguage();
    this.generalService.languageChangeSubject.subscribe((value) => {
      this.lang = value;
    });


    this.route.queryParams.subscribe(params => {
      this.IdSitioTuristico = params["IdSitioTuristico"];

      this.generalService.getDataPromise("sitiosTuristicos").then(async (res) => {
        await this.openLoading();
        this.sitiosTuristicos = JSON.parse(res.value);
        this.itemData = this.sitiosTuristicos.find(x => x.IdSitioTuristico == this.IdSitioTuristico);
        objThis.loadMap();
      });

      this.categoria = params["categoria"];
      this.mapType = params["mapType"];
    });
    this.infoWindow = new google.maps.InfoWindow();
    objThis.currentPosition = new google.maps.LatLng(6.378543, -75.4464299); //Girardota

    let watchPosition = this.geolocation.watchPosition();
    var objThis = this;
    watchPosition.subscribe((data: any) => {
      objThis.currentPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    });
    this.platform.ready().then(() => {
      this.validateIfGPSIsEnabled();
    });
  }

  ngOnInit() {
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: this.lang == 'ENG' ? "Please wait..." : "Por favor espere...",
      keyboardClose: false
    });
  }

  validateIfGPSIsEnabled() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    });
  }

  calculateAndDisplayRoute(originDirection: string, destinationDirection: string) {
    this.directionsService.route({
      origin: originDirection,
      destination: destinationDirection,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK') {
        this.drawRoute(response.routes[0].legs[0].steps);
      } else {
        this.loading.dismiss();
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  drawRoute(routePoints: any) {
    let coordinates: any[] = [];
    let origin: any;
    let destination: any;
    routePoints.forEach(function (objRoutePoint) {
      let aPath: any[] = objRoutePoint.path;
      aPath.forEach(function (objPath, index) {
        destination = new google.maps.LatLng(objPath.lat(), objPath.lng());
        coordinates.push(destination);
      });
    });
    this.drawLineMap(coordinates);
  }

  drawRouteHiking(routePoints: any) {
    let coordinates: any[] = [];
    let origin: any;
    let destination: any;
    routePoints.objPuntosSenderismo.forEach(function (objPath, index) {
      destination = new google.maps.LatLng(objPath.Latitud, objPath.Longitud);
      coordinates.push(destination);
    });
    this.drawLineMap(coordinates);
    let puntosSenderismo = routePoints.valoreSPuntosSenderismo[0];
    let latitudPS = (parseFloat(puntosSenderismo.MaxLatitud) + parseFloat(puntosSenderismo.MinLatitud)) / 2;
    let longitudPS = (parseFloat(puntosSenderismo.MaxLongitud) + parseFloat(puntosSenderismo.MinLongitud)) / 2;
    this.currentPosition = new google.maps.LatLng(latitudPS, longitudPS);
    this.map.setCenter(this.currentPosition);

    let puntoInicial = routePoints.objPuntosSenderismo[0];
    let puntoFinal = routePoints.objPuntosSenderismo[routePoints.objPuntosSenderismo.length - 1];

    let latLngInicio = new google.maps.LatLng(puntoInicial.Latitud, puntoInicial.Longitud);
    let latLngFin = new google.maps.LatLng(puntoFinal.Latitud, puntoFinal.Longitud);

    let iconIniFin = {
      // anchor: new google.maps.Point(30, 30.26),
      // size: new google.maps.Size(50, 50),
      url: "../../assets/map/icon_final.png"
    }
    new google.maps.Marker({
      position: latLngInicio,
      map: this.map,
      icon: iconIniFin
    });

    new google.maps.Marker({
      position: latLngFin,
      map: this.map,
      icon: iconIniFin
    });

    var objThis = this;
    routePoints.objPuntosReferenciaSenderismo.forEach(function (objPuntoReferencia, i) {

      let latLng = new google.maps.LatLng(objPuntoReferencia.Latitud, objPuntoReferencia.Longitud);

      let marker = new google.maps.Marker({
        position: latLng,
        map: objThis.map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          objThis.infoWindow.setContent(objThis.lang === "ENG" ? objPuntoReferencia.NombrePuntoENG : objPuntoReferencia.NombrePunto);
          objThis.infoWindow.open(objThis.map, marker);
        }
      })(marker, i));
    });
  }

  async ObtenerPuntosSenderismo(IdSitioTuristico: number) {
    let objPuntosSenderismo = await this.syncService.ObtenerPuntosSenderismo(IdSitioTuristico);
    this.drawRouteHiking(objPuntosSenderismo);
    this.loading.dismiss();
  }

  routePath: any = null;

  drawLineMap(coordinates: any[]) {
    this.routePath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#1e315a",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    this.routePath.setMap(this.map);
  }

  async goToCurrentLocation() {
    await this.openLoading();
    this.map.setCenter(this.currentPosition);
    this.loading.dismiss();
  }

  ObtenerRuta(itemData: any) {
    let destinationDirection: string = itemData.Latitud + ', ' + itemData.Longitud;
    let originDirection: string = this.currentPosition.lat() + ', ' + this.currentPosition.lng();
    this.calculateAndDisplayRoute(originDirection, destinationDirection);
    this.loading.dismiss();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.itemData.Latitud, this.itemData.Longitud);

    let mapOptions = {
      center: latLng,
      zoom: 13,
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
    if (this.mapType === "1") {
      this.ObtenerPuntosSenderismo(this.itemData.IdSitioTuristico);
    } else {
      this.ObtenerRuta(this.itemData);
    }
  }

  cambiarIdioma() {
    this.lang = this.lang === "ENG" ? "ESP" : "ENG";
    this.generalService.setCurrentLanguage(this.lang);
  }

  fnAtras() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        IdSitioTuristico: this.itemData.IdSitioTuristico,
        categoria: this.categoria
      }
    };
    this.navController.navigateBack(["/sitio-turistico"], navigationExtras);
  }

  centerUserPosition(){
    this.map.setCenter(this.currentPosition);
  }
}
