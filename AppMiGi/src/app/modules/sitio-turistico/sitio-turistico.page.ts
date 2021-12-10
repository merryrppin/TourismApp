import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'


import { ActivatedRoute } from "@angular/router";
import { GeneralService } from '../../core/General/general.service';
import { SyncService } from '../../core/sync/sync.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sitio-turistico',
  templateUrl: './sitio-turistico.page.html',
  styleUrls: ['./sitio-turistico.page.scss'],
})
export class SitioTuristicoPage {
  mainPredictionArray: { header: string; predictionImageURL: string; subject: string; }[];
  loginProfilePic: any;
  itemData: any;
  categoria: string;
  lang: string;

  constructor(private geolocation: Geolocation,
    private syncService: SyncService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private navController: NavController) {
    this.lang = this.generalService.getCurrentLanguage();
    this.route.queryParams.subscribe(params => {
      this.itemData = JSON.parse(params["itemData"]);
      this.categoria = params["categoria"];
      setTimeout(function () {

      }, 2000);
    });
    this.showSlides();
  }
  showSlides() {
    this.mainPredictionArray = [
      { "header": "Catedral nuestra señora del rosario", "predictionImageURL": "../../assets/img_catedral.jpg", "subject": "Un maravilloso lugar lleno de magia, paz y sobre todo de una devoción religiosa única. Con un estilo único e inigualable es uno de los lugares mas frecuentado en girardota" },

      { "header": "Milan Marvadi", "predictionImageURL": "../../assets/img_senorcaido.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. " },

      { "header": "Shailesh Kotho", "predictionImageURL": "../../assets/img_procesion.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. " }
    ]
  }

  mejorRuta(item: any, type:number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        itemData: JSON.stringify(item),
        categoria: this.categoria,
        mapType: type
      }
    };
    this.navController.navigateRoot(["/genericmap"], navigationExtras);
  }


  cambiarIdioma() {
    this.lang = this.lang === "ENG" ? "ESP" : "ENG";
    this.generalService.setCurrentLanguage(this.lang);
  }

  fnAtras() {
    let urlTab = "";
    switch (this.categoria) {
      case "SDM":
        urlTab = "senderismo";
        break;
      case "RGS":
        urlTab = "religioso";
        break;
      case "GTM":
        urlTab = "gastronomico";

    }
    this.navController.navigateBack(["/tabs/" + urlTab]);
  }

}
