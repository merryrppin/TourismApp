import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { CulturaGeneralMunicipio } from 'src/app/data/models/culturageneralmunicipio';
import { DataAcordeon } from 'src/app/data/models/dataacordeon';
import { SitioTuristico } from 'src/app/data/models/sitioturistico';
import { GeneralService } from '../../core/General/general.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  idioma: string = "ESP"; //TEST 
  idMunicipio: number = 1; //Girardota
  //map: GoogleMap;
  loading: any;
  datosMunicipio:CulturaGeneralMunicipio[];
  datosSitioTuristico:DataAcordeon[];
  aSitiosTuristicos:SitioTuristico[];
  initialMapLoad:boolean=false;
  aSitiosTuristicosUnique:SitioTuristico[];

  currentMarkerPosition:any = null;
  //markerUser: Marker;
  //currentMarkerPosition: LatLng = null;
  constructor(private generalService:GeneralService) { }

  
  @ViewChild('map_canvas') mapView: ElementRef;
  ngOnInit() {
  }

  getCurrentLanguageESP():boolean{
    return this.generalService.getCurrentLanguage() == "ESP";
  }

  drawRouteFromMarker(){

  }

async ionViewDidEnter() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.86,
      longitude: 151.20,
      zoom: 12
    })
    .then(response => {
      debugger;
      console.log(response);
    })
    .catch(error => {
      debugger;
      console.log(error);
    });

    CapacitorGoogleMaps.addListener("onMapReady", async function() {

      /*
        We can do all the magic here when map is ready
      */

      CapacitorGoogleMaps.addMarker({
        latitude: -33.86,
        longitude: 151.20,
        title: "Custom Title",
        snippet: "Custom Snippet",
      });

      CapacitorGoogleMaps.setMapType({
        "type": "normal"
      })
    })
}

ionViewDidLeave() {
  debugger;
    CapacitorGoogleMaps.close();
}

}
