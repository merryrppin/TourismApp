import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { CulturaGeneralMunicipio } from 'src/app/data/models/culturageneralmunicipio';
import { DataAcordeon } from 'src/app/data/models/dataacordeon';
import { SitioTuristico } from 'src/app/data/models/sitioturistico';
import { GoogleMapComponent } from 'src/app/shared/customcontrols/google-maps/google-map.component';
import { GeneralService } from '../../core/General/general.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {
  @ViewChild(GoogleMapComponent) mapComponent: GoogleMapComponent;
  idioma: string = "ESP"; //TEST 
  idMunicipio: number = 1; //Girardota
  //map: GoogleMap;
  loading: any;
  datosMunicipio: CulturaGeneralMunicipio[];
  datosSitioTuristico: DataAcordeon[];
  aSitiosTuristicos: SitioTuristico[];
  initialMapLoad: boolean = false;
  aSitiosTuristicosUnique: SitioTuristico[];

  currentMarkerPosition: any = null;
  //markerUser: Marker;
  //currentMarkerPosition: LatLng = null;

  @Input('apiKey') apiKey: string;
  public map: any;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  private networkHandler = null;
  generalService: GeneralService;

  constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document) {
  }

  getCurrentLanguageESP(): boolean {
    return this.generalService.getCurrentLanguage() == "ESP";
  }

  getCurrentLanguage(): string {
    return this.generalService.getCurrentLanguage();
  }

  drawRouteFromMarker() {

  }

  // async ionViewDidEnter() {
  //   const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

  //   CapacitorGoogleMaps.create({
  //     width: Math.round(boundingRect.width),
  //     height: Math.round(boundingRect.height),
  //     x: Math.round(boundingRect.x),
  //     y: Math.round(boundingRect.y),
  //     latitude: -33.86,
  //     longitude: 151.20,
  //     zoom: 12
  //   })
  //     .then(response => {
  //       debugger;
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       debugger;
  //       console.log(error);
  //     });

  //   CapacitorGoogleMaps.addListener("onMapReady", async function () {

  //     /*
  //       We can do all the magic here when map is ready
  //     */

  //     CapacitorGoogleMaps.addMarker({
  //       latitude: -33.86,
  //       longitude: 151.20,
  //       title: "Custom Title",
  //       snippet: "Custom Snippet",
  //     });

  //     CapacitorGoogleMaps.setMapType({
  //       "type": "normal"
  //     })
  //   })
  // }

  // ionViewDidLeave() {
  //   debugger;
  //   CapacitorGoogleMaps.close();
  // }

}
