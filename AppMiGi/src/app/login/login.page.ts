import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { UsuarioApp } from '../data/models/usuarioapp';
import { StorageService } from '../core/services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { SyncService } from '../core/sync/sync.service';
import { GeneralService } from '../core/General/general.service';
import { CONSTANTS } from '../core/services/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: any;
  loading: any;
  lang: string;

  constructor(
    private generalService: GeneralService,
    private syncService: SyncService,
    private navController: NavController,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private storage: StorageService) {
    this.loadUser();
    this.lang = this.generalService.getCurrentLanguage();
    this.generalService.languageChangeSubject.subscribe((value) =>{
      this.lang = value;
    });
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: this.lang == 'ENG' ? "Please wait..." : "Por favor espere...",
      keyboardClose: false
    });
  }

  async loadUser() {
    this.user = await this.storage.getUser("User");
    if (typeof this.user !== 'undefined' && this.user !== null) {
      await this.openLoading();
      let data = await this.syncService.GetSesionUsuarioApp(this.user.IdSesion);
      this.loading.dismiss();
      if (data.length > 0) {
        this.goToHomePage();
      } else {
        this.storage.setUser("User", null);
      }
    }
  }

  loginGoogle() {
    this.googlePlus.login({
      'webClientId': CONSTANTS.webClientId,
      'offline': true
    })
      .then((user) => {
        let usuarioApp: UsuarioApp = this.createUserObject(user.idToken, user.givenName, user.familyName, user.imageUrl, user.email, 'google');
        this.saveLogin(usuarioApp);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  createUserObject(idToken: string, givenName: string, familyName: string, imageUrl: string, email: string, loginType: string): UsuarioApp {
    let usuarioApp: UsuarioApp = new UsuarioApp();
    usuarioApp.IdToken = idToken;
    usuarioApp.GivenName = givenName;
    usuarioApp.FamilyName = familyName;
    usuarioApp.ImageUrl = imageUrl;
    usuarioApp.Email = email;
    usuarioApp.LoginType = loginType;
    return usuarioApp;
  }

  async saveLogin(usuarioApp: UsuarioApp) {
    await this.openLoading();
    let data = await this.syncService.GuardarSesionUsuarioApp(usuarioApp, '');
    usuarioApp.IdSesion = data.value[0].rows[0][0];
    this.storage.setUser("User", usuarioApp);
    this.loading.dismiss();
    this.goToHomePage();
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        var objThis = this;
        this.fb.api("me?fields=id,name,email,picture.width(500).height(500)", ["public_profile", "email"])
          .then(function (user) {
            let usuarioApp: UsuarioApp = objThis.createUserObject(user.id, user.name, "", user.picture.data.url, user.email, 'facebook');
            objThis.saveLogin(usuarioApp);
          })
          .catch(function (err) {
            console.log('Error getting data Facebook', err);
          });
      })
      .catch(e => {
        console.log('Error logging into Facebook', e);
      });
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  goToHomePage() {
    this.navController.navigateRoot(["/tabs/inicio"]).then(() => { })
  }
}
