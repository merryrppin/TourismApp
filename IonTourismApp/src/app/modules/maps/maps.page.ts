import { Component, OnInit } from "@angular/core";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LatLng
} from "@ionic-native/google-maps";

import { Platform, LoadingController, ToastController } from "@ionic/angular";
import { SitioTuristico } from "src/app/data/models/sitioturistico";
import { CulturaGenralMunicipio } from "src/app/data/models/culturageneralmunicipio";
import { GeneralService } from "src/app/core/Services/General/general.service";
import { SyncService } from "src/app/core/Services/sync/sync.service";
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {

  idioma: string = "ESP"; //TEST 
  idMunicipio: number = 1; //Girardota
  map: GoogleMap;
  loading: any;
  datosMunicipio:CulturaGenralMunicipio[];

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private generalService:GeneralService,
    private syncService:SyncService
  ) { }

  async ngOnInit() {
    // Debido ngOnInit() inicia antes del evento
    // deviceready, debemos detectar cuando este evento se
    // ejecute para en ese momento cargar nuestro mapa sin problema alguno
    await this.platform.ready();
    this.loadMap();
    await this.localizar();
    await this.cargarDatosMunicipio();
    
  }
  async cargarDatosMunicipio(){
    debugger;
    let data = await this.syncService.descargarDatosMunicipio();
    this.datosMunicipio = this.arrayMap(data.value[0].rows,data.value[0].columns);
  }

  loadMap() {
    // Esta función inicializa la propiedad de clase
    // map
    // que va a contener el control de nuestro mapa de google

    // Para crear nuestro mapa debemos enviar como parametros
    // el id del div en donde se va a renderizar el mapa (paso anterior)
    // y las opciones que configuran nuestro mapa
    this.map = GoogleMaps.create("map_canvas", {
      camera: {
        target: {
          lat: 6.378543,
          lng: -75.4464299
        },
        zoom: 15,
        tilt: 30
      }
    });
  }

  async localizar() {
    const loading = await this.generalService.presentLoading({
      message: "por favor espere...",
      keyboardClose: false
    });
    // Limpiamos todos los elementos de nuestro mapa
    this.map.clear();
    // Presentamos el componente creado en el paso anterior
    loading.present();
    this.cargarSitiosTuristicos(this.map);
    loading.dismiss();
  }

  // Función que muestra un Toast en la parte inferior
  // de la pantalla
  async showToast(mensaje) {
    let toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: "bottom"
    });

    toast.present();
  }

  async cargarSitiosTuristicos(map:GoogleMap) {
    let data = await this.syncService.descargarDatos()
    let jsonRows  = data.value[0].rows;
    let jsonColumns  = data.value[0].columns;    
    let aSitiosTuristicos:SitioTuristico[] = this.arrayMap(jsonRows, jsonColumns);
    this.dibujarSitiosTuristicos(map, aSitiosTuristicos);
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

  dibujarSitiosTuristicos(map:GoogleMap, SitiosTuristicos: SitioTuristico[]) {
    SitiosTuristicos.forEach(function (objSitioTuristico) {
      let latLng: LatLng = new LatLng(objSitioTuristico.Latitud, objSitioTuristico.Longitud);

      let marker: Marker = map.addMarkerSync({
        title: objSitioTuristico.NombreSitioTuristicoESP,
        position: latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });
    });
  }
}
