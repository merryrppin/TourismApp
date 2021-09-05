import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/Services/storage/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  user : any;
  constructor(private navController: NavController,
              private storage:StorageService) { }


  async loginGoogle() {
    this.user = await GoogleAuth.signIn();
    console.log(this.user.authentication.idToken);
    if(this.user.authentication.idToken)
    {
      this.storage.setUser("User",this.user.authentication.idToken);
      this.navController.navigateRoot(["/index"]).then(()=> {
        console.log("Login exitoso.");
      })
    }
    // GoogleAuth.signOut()
    //GoogleAuth.refresh() 
  }

}
