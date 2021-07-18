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

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform
  ) { }

  async ngOnInit() {
    // Debido ngOnInit() inicia antes del evento
    // deviceready, debemos detectar cuando este evento se
    // ejecute para en ese momento cargar nuestro mapa sin problema alguno
    await this.platform.ready();
    this.loadMap();
    await this.localizar();
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
    // Limpiamos todos los elementos de nuestro mapa
    this.map.clear();
    this.loading = await this.loadingCtrl.create({
      message: "Espera por favor..."
    });

    // Presentamos el componente creado en el paso anterior
    await this.loading.present();

    this.cargarSitiosTuristicos(this.map);
    this.loading.dismiss();
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

  cargarSitiosTuristicos(map:GoogleMap) {
    let jsonRows :string = '[["1","Parque Principal Girardota","1","6.374737600","-75.449925400"],["2","Placa Deportiva Barrio el Paraíso","1","6.374281500","-75.446336800"],["3","Comfama Girardota","1","6.377480300","-75.450563900"]]';
    let jsonColumns :string = '["IdSitioTuristico","NombreSitioTuristicoESP","IdMunicipio","Latitud","Longitud"]';    
    let aSitiosTuristicos:SitioTuristico[] = this.arrayMap(jsonRows, jsonColumns);
    this.dibujarSitiosTuristicos(map, aSitiosTuristicos);
  }

  arrayMap(jsonRows: string, jsonColumns: string):any[] {
    let aColumns: string[] = JSON.parse(jsonColumns);
    let aRows: string[] = JSON.parse(jsonRows);
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
