import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { ActivatedRoute } from "@angular/router";
import { GeneralService } from '../../core/General/general.service';
import { SyncService } from '../../core/sync/sync.service';
import { NavigationExtras } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/core/services/storage/storage.service';

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
  IdSitioTuristico: string;
  sitiosTuristicos: any[];
  loading: any;
  habilitarOpinion: boolean = false;
  imageFileDefault: string = "../../../assets/default-img.png"
  imgComentario1: string;
  imgComentario2: string;
  commentsST: string;
  calificacionComentario: string;
  user: any;

  constructor(private geolocation: Geolocation,
    private syncService: SyncService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private navController: NavController,
    private camera: Camera,
    private file: File,
    public actionSheetController: ActionSheetController,
    private storage: StorageService) {
    this.imgComentario1 = this.imageFileDefault;
    this.imgComentario2 = this.imageFileDefault;
    this.calificacionComentario = "5";
    this.lang = this.generalService.getCurrentLanguage();
    this.route.queryParams.subscribe(params => {
      this.IdSitioTuristico = params["IdSitioTuristico"];
      this.categoria = params["categoria"];
      this.itemData = generalService.getSitioTuristicoEmpty();
      this.generalService.getDataPromise("sitiosTuristicos").then((res) => {
        this.sitiosTuristicos = JSON.parse(res.value);
        this.itemData = this.sitiosTuristicos.find(x => x.IdSitioTuristico == this.IdSitioTuristico);
        this.itemData.Comentarios = JSON.parse(this.itemData.Comentarios);
      });
    });
    this.showSlides();
    this.loadUserInfo();
  }

  async loadUserInfo() {
    await this.openLoading().then(async () => {
      this.user = await this.storage.getUser("User");
      this.loading.dismiss();
    });
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: this.lang == 'ENG' ? "Please wait..." : "Por favor espere...",
      keyboardClose: false
    });
  }

  showSlides() {
    this.mainPredictionArray = [
      { "header": "Catedral nuestra señora del rosario", "predictionImageURL": "../../assets/img_catedral.jpg", "subject": "Un maravilloso lugar lleno de magia, paz y sobre todo de una devoción religiosa única. Con un estilo único e inigualable es uno de los lugares mas frecuentado en girardota" },

      { "header": "Milan Marvadi", "predictionImageURL": "../../assets/img_senorcaido.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. " },

      { "header": "Shailesh Kotho", "predictionImageURL": "../../assets/img_procesion.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. " }
    ]
  }

  mejorRuta(item: any, type: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        IdSitioTuristico: item.IdSitioTuristico,
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

  cambiarCalificacion(calValue: string) {
    this.calificacionComentario = calValue;
  }

  setHabilitarOpinion(val: boolean) {
    this.habilitarOpinion = val;
  }

  escogerImagen(posImg: number, sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let imgInfo = 'data:image/jpeg;base64,' + imageData;
      if (posImg === 1) {
        this.imgComentario1 = imgInfo;
      } else if (posImg === 2) {
        this.imgComentario2 = imgInfo;
      }
    }, (err) => {
      // Handle error
    });
  }

  async seleccionarImagen(posImg: number) {
    const actionSheet = await this.actionSheetController.create({
      header: this.lang === "ENG" ? "Select Image source" : "Seleccionar origen de la imagen",
      buttons: [{
        text: this.lang === "ENG" ? "Load from Library" : "Cargar desde la librería",
        handler: () => {
          this.escogerImagen(posImg, this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: this.lang === "ENG" ? "Use Camera" : "Usar la cámara",
        handler: () => {
          this.escogerImagen(posImg, this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: this.lang === "ENG" ? "Cancel" : "Cancelar",
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  borrarImagen(posImg: number) {
    if (posImg === 1) {
      this.imgComentario1 = this.imageFileDefault;
    } else if (posImg === 2) {
      this.imgComentario2 = this.imageFileDefault;
    }
  }

  async enviarComentarios() {
    await this.openLoading();
    if (typeof this.user !== 'undefined' && this.user !== null) {
      let objComentarios = {
        Email: this.user.Email,
        LoginType: this.user.LoginType,
        IdSitioTuristico: this.IdSitioTuristico,
        Comentarios: this.commentsST,
        Calificacion: this.calificacionComentario,
        img1: this.imgComentario1 == this.imageFileDefault ? "" : this.imgComentario1,
        img2: this.imgComentario2 == this.imageFileDefault ? "" : this.imgComentario2
      }
      let data = await this.syncService.GuardarComentarios(objComentarios)
      .then()
      .catch((e) => {
        this.loading.dismiss();
        this.generalService.showToastError(e.message, 3500);
      });
    } else {
      let message = this.lang === "ENG" ? "There was a problem obtaining the user information, please try again later." : "Hubo un problema al obtener la información del usuario. Vuelva a intentarlo más tarde.";
      this.generalService.showToastError(message, 3500);
    }
    this.loading.dismiss();
  }

}
