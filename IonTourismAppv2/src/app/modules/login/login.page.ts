import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/Services/storage/storage.service';
import { SyncService } from 'src/app/core/sync/sync.service';
import { UsuarioApp } from 'src/app/data/models/usuarioapp';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: any;
  constructor(private navController: NavController,
    private syncService: SyncService,
    private storage: StorageService) {
      this.loadUser();
  }

  async loadUser(){
    this.user = await this.storage.getUser("User");
    if(typeof this.user !== 'undefined'){
      //consultar si el idSesion es válido y redireccionar
    }
  }

  async loginGoogle() {
    this.user = await GoogleAuth.signIn();
    if (this.user.authentication.idToken) {
      let usuarioApp: UsuarioApp = new UsuarioApp();
      usuarioApp.IdToken = this.user.idToken,
      usuarioApp.GivenName = this.user.givenName,
      usuarioApp.FamilyName = this.user.familyName,
      usuarioApp.ImageUrl = this.user.imageUrl,      
      usuarioApp.Email = this.user.email

      let data = await this.syncService.GuardarSesionUsuarioApp(usuarioApp, '');
      usuarioApp.IdSesion = data.value[0].rows[0][0];
      
      this.storage.setUser("User",usuarioApp);
      this.navController.navigateRoot(["/_mainLayout/index"]).then(()=> {
        console.log("Login exitoso.");
      })
    }
  }

}
