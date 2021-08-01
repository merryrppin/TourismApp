import { Component, NgZone, OnInit } from "@angular/core";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LatLng,
  MarkerOptions
} from "@ionic-native/google-maps";

import { Platform, LoadingController, ToastController } from "@ionic/angular";
import { SitioTuristico } from "src/app/data/models/sitioturistico";
import { CulturaGeneralMunicipio } from "src/app/data/models/culturageneralmunicipio";
import { GeneralService } from "src/app/core/Services/General/general.service";
import { SyncService } from "src/app/core/Services/sync/sync.service";
import { DataAcordeon } from '../../data/models/dataacordeon';
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
  datosMunicipio:CulturaGeneralMunicipio[];
  datosSitioTuristico:DataAcordeon[];
  aSitiosTuristicos:SitioTuristico[];

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private generalService:GeneralService,
    private syncService:SyncService,
    private zone: NgZone
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
    let data = await this.syncService.descargarDatosMunicipio();
    this.datosMunicipio = this.arrayMap(data.value[0].rows,data.value[0].columns);

    let objData : DataAcordeon = new DataAcordeon();
    objData.Nombre = this.datosMunicipio[0].NombreMunicipio;
    objData.ValorESP = this.datosMunicipio[0].ValorESP;
    objData.Imagen = this.datosMunicipio[0].Imagen;
    objData.Orden = this.datosMunicipio[0].Orden;
    this.datosSitioTuristico = [objData]
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
    await this.cargarSitiosTuristicos();
    loading.dismiss();   
  }

  async cargarSitiosTuristicos() {
    let data = await this.syncService.descargarDatos()
    let jsonRows  = data.value[0].rows;
    let jsonColumns  = data.value[0].columns;    
    this.aSitiosTuristicos = this.arrayMap(jsonRows, jsonColumns);
    let aSitiosTuristicosUnique:SitioTuristico[];
    aSitiosTuristicosUnique = this.aSitiosTuristicos.filter((objSitioTuristico, i, aSitioTuristico) => aSitioTuristico.findIndex(t => t.IdSitioTuristico === objSitioTuristico.IdSitioTuristico) === i);

    await this.dibujarSitiosTuristicos(aSitiosTuristicosUnique, this);
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

  dibujarSitiosTuristicos(SitiosTuristicos: SitioTuristico[], objThis:any) {
    SitiosTuristicos.forEach(function (objSitioTuristico) {
      let latLng: LatLng = new LatLng(objSitioTuristico.Latitud, objSitioTuristico.Longitud);
      
      let markerOptions: MarkerOptions = {
        title: objSitioTuristico.NombreSitioTuristicoESP,
        position: latLng,
        animation: GoogleMapsAnimation.BOUNCE,
        SitioTuristico : objSitioTuristico,
        icon: objSitioTuristico.IconoMarcador
      };

      let marker: Marker = objThis.map.addMarkerSync(markerOptions);
      
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params: any) => {
        objThis.datosSitioTuristico = []
        let marker: Marker = <Marker>params[1];
        let SitioTuristico: SitioTuristico = marker.get('SitioTuristico');
        let aSitiosTuristicos = objThis.aSitiosTuristicos.filter(obj=> obj.IdSitioTuristico === SitioTuristico.IdSitioTuristico);
        let objData : DataAcordeon = new DataAcordeon();
        let pr = aSitiosTuristicos.map(o=>({
          Nombre:o.Titulo,
          ValorESP:o.DescripcionESP,
          Imagen:o.Imagen,
          Orden:o.Orden
        }))
     
        objThis.datosSitioTuristico = pr;

        objThis.zone.run(() => {});
      });
    });
  }
}
