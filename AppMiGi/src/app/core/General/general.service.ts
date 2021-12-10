import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastOptions } from "@ionic/core";
import { StorageService } from '../services/storage/storage.service';


export interface IOptionLoading {
  message: string;
  keyboardClose: boolean;
}

interface IOptionToast {
  position?: "top" | "bottom" | "middle";
  duration?: number;
  color?: "primary" | "success" | "warning" | "danger" | "dark";
  cssClass?: "toastStyle";
}
interface IOptionAlertConfirm {
  message: string;
  buttonTextYes?: string;
  buttonTextNo?: string;
  enableCountDown?: boolean;
  /** Set time on seconds */
  timeCountDown?: number;
}
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public currentLanguage: string = "ESP";
  private _toast: HTMLIonToastElement;
  readonly limitToast: number = 3000;
  public categoriaActual: string = "";
  private messageSource = new BehaviorSubject("Marcacion SEF");
  currentMessage = this.messageSource.asObservable();

  languageChangeSubject: Subject<string> = new Subject<string>();
  
  constructor(
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private storage: StorageService) {
    this.storage.getIdioma("lang").then((obj) => {
      this.currentLanguage = obj.value;
    });
    this.storage.getIdioma("categoria").then((obj) => {
      this.categoriaActual = obj.value;
    });
    
    this.languageChangeSubject.subscribe((value) => {
      this.currentLanguage = value
  });
  }

  toastDissmiss() {
    setTimeout(() => {
      if (this._toast) this._toast.dismiss();
    });
  }

  async presentLoading(opts: IOptionLoading): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: opts.message,
      backdropDismiss: false,
      spinner: "crescent",
      mode: "ios",
      keyboardClose: opts.keyboardClose
    });

    await loading.present();
    return loading;
  }

  async showMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top", color: "dark" }
  ): Promise<HTMLIonToastElement> {
    opt.color = "dark";
    return this.toastMessage(message, showButtonDismiss, opt);
  }

  async showErrorMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top", color: "danger" }
  ): Promise<HTMLIonToastElement> {
    opt.color = "danger";
    return this.toastMessage(message, showButtonDismiss, opt);
  }

  async showInfoMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top", color: "primary" }
  ): Promise<HTMLIonToastElement> {
    opt.color = "primary";
    return this.toastMessage(message, showButtonDismiss, opt);
  }

  async showWarningMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top", color: "warning" }
  ): Promise<HTMLIonToastElement> {
    opt.color = "warning";
    return this.toastMessage(message, showButtonDismiss, opt);
  }

  async showSuccessMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top", color: "success" }
  ): Promise<HTMLIonToastElement> {
    opt.color = "success";
    return this.toastMessage(message, showButtonDismiss, opt);
  }

  private async toastMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast
  ): Promise<HTMLIonToastElement> {
    let options: ToastOptions = {
      message: message,
      duration: opt.duration > 0 ? opt.duration : 7000,
      position: opt.position ? opt.position : "top",
      color: opt.color ? opt.color : "dark"
    };
    this._toast = await this.toastCtrl.create(options);
    this._toast.present();
    return this._toast;
  }

  showToastSuccess(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: duration,
      cssClass: 'my-custom-class',
      buttons: [
        {
          side: 'start',
          icon: '../../assets/images/success.svg',
        }, {
          side: 'end',
          text: 'X',
          role: 'cancel',
        }
      ]
    }).then((obj) => {
      obj.present();
    });
  }

  showToastError(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: duration,
      cssClass: 'my-custom-class',
      buttons: [
        {
          side: 'start',
          icon: '../../assets/images/information.svg',
        }, {
          side: 'end',
          text: 'X',
          role: 'cancel',
        }
      ]
    }).then((obj) => {
      obj.present();
    });
  }

  showToastInfo(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: duration,
      cssClass: 'my-custom-class',
      buttons: [
        {
          side: 'start',
          icon: '../../assets/images/information.svg',
        }, {
          side: 'end',
          icon: 'close',
          role: 'cancel',
        }
      ]
    }).then((obj) => {
      obj.present();
    });
  }

  async changeMessage(Title: string) {
    this.messageSource.next(Title)
  }

  async showConfirmedMessage(opt: IOptionAlertConfirm) {
    let labelYes = opt.buttonTextYes ? opt.buttonTextYes : "Yes";
    const labelNo = opt.buttonTextYes ? opt.buttonTextNo : "No";
    const cssClassDisableButton = "confirm-disable";
    let timeCount = opt.timeCountDown ? opt.timeCountDown : 5;
    return new Promise<boolean>(async (resolve, reject) => {
      let confirm = await this.alertController.create({
        message: opt.message,
        mode: "ios",
        buttons: [
          {
            text: opt.enableCountDown ? `${labelYes} (${timeCount})` : labelYes,
            handler: () => {
              resolve(true);
            },
            cssClass: opt.enableCountDown ? cssClassDisableButton : ""
          },
          {
            text: labelNo,
            handler: () => {
              resolve(false);
            },
            role: "cancel"
          }
        ]
      });
      await confirm.present().then(() => {
        if (opt.enableCountDown) {
          const btnYes = confirm.querySelector(
            "div.alert-button-group button:nth-of-type(1)"
          );
          const spanText = <HTMLSpanElement>btnYes.querySelector("span");
          const timeInterval = 1000;
          const interval = setInterval(() => {
            timeCount--;
            if (timeCount <= 0) {
              spanText.innerText = `${labelYes}`;
              btnYes.classList.remove(cssClassDisableButton);
              clearInterval(interval);
            } else {
              spanText.innerText = `${labelYes} (${timeCount})`;
            }
          }, timeInterval);
        }
      });
    });
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(language: string) {
    this.storage.setIdioma("lang", language);
    this.currentLanguage = language;
    this.languageChangeSubject.next(language);
  }
  getCategoriaActual(): string {
    return this.categoriaActual;
  }
  setCategoria(categoria: string) {
    this.storage.setIdioma("categoria", categoria);
    this.categoriaActual = categoria;
  }
}
