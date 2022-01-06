import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { ActivatedRoute } from "@angular/router";
import { GeneralService } from '../../core/General/general.service';
import { SyncService } from '../../core/sync/sync.service';
import { NavigationExtras } from '@angular/router';
import { ActionSheetController, IonSlides, NavController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/shared/modal/modal.page'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

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
  imgComentario1ToSave: string;
  imgComentario2ToSave: string;
  commentsST: string;
  calificacionComentario: string;
  user: any;
  calValueInputGen: string = "";
  items: string[] = ["../../assets/img_catedral.jpg", "../../assets/img_senorcaido.jpg", "../../assets/img_procesion.jpg"]

  constructor(private geolocation: Geolocation,
    private syncService: SyncService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private navController: NavController,
    private camera: Camera,
    private file: File,
    public actionSheetController: ActionSheetController,
    private storage: StorageService,
    public modalController: ModalController,
    private screenOr: ScreenOrientation) {
    this.imgComentario1 = this.imageFileDefault;
    this.imgComentario2 = this.imageFileDefault;
    this.calificacionComentario = "5";
    this.lang = this.generalService.getCurrentLanguage();
    this.route.queryParams.subscribe(params => {
      this.IdSitioTuristico = params["IdSitioTuristico"];
      this.categoria = params["categoria"];
      this.itemData = generalService.getSitioTuristicoEmpty();
      this.loadSitioTuristico();
    });
    this.loadUserInfo();
  }

  loadSitioTuristico() {
    this.generalService.getDataPromise("sitiosTuristicos").then((res) => {
      this.sitiosTuristicos = JSON.parse(res.value);
      this.itemData = this.sitiosTuristicos.find(x => x.IdSitioTuristico == this.IdSitioTuristico);
      this.itemData.Comentarios = this.itemData.Comentarios !== "" ? JSON.parse(this.itemData.Comentarios) : [];
      this.calValueInputGen = this.itemData.PromCalificacion.toString();
      this.itemData.Imagenes = this.itemData.Imagenes !== "" ? JSON.parse(this.itemData.Imagenes) : [];
      this.screenOr.lock(this.screenOr.ORIENTATIONS.PORTRAIT);
      this.loading.dismiss();
    });
  }

  @ViewChild(IonSlides) slides: IonSlides;

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
    this.itemData.Imagenes;
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
        this.imgComentario1ToSave = imageData;
      } else if (posImg === 2) {
        this.imgComentario2 = imgInfo;
        this.imgComentario2ToSave = imageData;
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

  async reloadSitiosTuristicos() {
    await this.openLoading();
    this.generalService.getDataPromise("sitiosTuristicos").then(async (resp) => {
      let data = '{"StoredParams":[{"Name":"IdMunicipio", "Value":"-1"}],"StoredProcedureName":"ObtenerSitiosTuristicos"}';
      let result = await this.syncService.obtenerInformacionSP(data);
      this.generalService.setDataPromise("sitiosTuristicos", JSON.stringify(result));
      this.loadSitioTuristico();
    });
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
        img1: this.imgComentario1ToSave == this.imageFileDefault ? "" : this.imgComentario1ToSave,
        img2: this.imgComentario2ToSave == this.imageFileDefault ? "" : this.imgComentario2ToSave,
        NombreCompleto: this.user.GivenName + " " + this.user.FamilyName
      }
      let data = await this.syncService.GuardarComentarios(objComentarios)
        .then(() => {
          this.generalService.showToastSuccess(this.lang === "ENG" ? "Thanks for your comments" : "Gracias por tus comentarios", 3500);
          this.setHabilitarOpinion(false);
          this.reloadSitiosTuristicos();
        })
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

  async abrirModal(index: number) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        images: this.itemData.Imagenes,
        index: index
      }
    });

    return await modal.present();

  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  // async openViewer(url :string) {
  //   const modal = await this.modalController.create({
  //     component: ViewerModalComponent,
  //     componentProps: {
  //       src: url
  //     },
  //     cssClass: 'ion-img-viewer',
  //     keyboardClose: true,
  //     showBackdrop: true
  //   });

  //   return await modal.present();
  // }

}
