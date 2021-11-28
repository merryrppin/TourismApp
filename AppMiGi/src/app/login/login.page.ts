import { Component, OnInit } from '@angular/core';

import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData:any={};

  constructor(
    private googlePlus: GooglePlus
    ) { }

  ngOnInit() {
  }

  googleSignIn(){
    debugger;
    this.googlePlus.login({})
      .then((result) =>{
        debugger;
        this.userData = result
      } )
      .catch((err) => {
        debugger;
        this.userData = `Error ${JSON.stringify(err)}`
    });
  }

}
