import { Component, OnInit } from '@angular/core';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { StorageService } from '../../core/services/storage/storage.service';
import { GeneralService } from 'src/app/core/General/general.service';
import { NavController } from '@ionic/angular';
import { SyncService } from '../../core/sync/sync.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  loading: any;
  user: any;
  lang: string;

  constructor(
    private generalService: GeneralService,
    private syncService: SyncService,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private navController: NavController,
    private storage: StorageService) { }

  ngOnInit() {
    this.lang = this.generalService.getCurrentLanguage();
    this.loadUser();
  }

  async loadUser() {
    this.user = await this.storage.getUser("User");
    if (typeof this.user !== 'undefined' && this.user !== null) {
      await this.openLoading();
      let data = await this.syncService.GetSesionUsuarioApp(this.user.IdSesion);
      this.loading.dismiss();
      if (data.length == 0) {
        this.storage.setUser("User", null);
        this.goToLoginPage();
      }
    }
  }

  async cerrarSesion() {
    await this.openLoading();
    if (typeof this.user !== 'undefined' && this.user !== null) {
      if (this.user.LoginType == "google") {
        this.logoutGoogle();
      } else if (this.user.LoginType == "facebook") {
        this.logoutFacebook();
      } else {
        this.storage.setUser("User", null);
        this.goToLoginPage();
      }
    } else {
      this.storage.setUser("User", null);
      this.loading.dismiss();
      this.goToLoginPage();
    }
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: this.lang == 'ENG' ? "Please wait..." : "Por favor espere...",
      keyboardClose: false
    });
  }

  logoutFacebook() {
    var objThis = this;
    this.fb.logout()
      .then(function (resp) {
        objThis.storage.setUser("User", null);
        this.loading.dismiss();
        this.goToLoginPage();
      })
      .catch(function (err) {
        this.loading.dismiss();
        this.showErrorMessage(err);
      })
  }

  showErrorMessage(message: string) {
    this.generalService.showToastError(message, 3500)
  }

  logoutGoogle() {
    var objThis = this;
    this.googlePlus.logout()
      .then(function (resp) {
        objThis.storage.setUser("User", null);
        this.loading.dismiss();
        this.goToLoginPage();
      })
      .catch(function (err) {
        this.loading.dismiss();
        this.showErrorMessage(err);
      })
  }

  goToLoginPage() {
    this.navController.navigateRoot(["/login"]).then(() => { })
  }
}
