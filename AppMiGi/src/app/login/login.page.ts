import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private googlePlus: GooglePlus) { }

  ngOnInit() {
  }

  userLogin: any = {};
  loginGoogle(){
    this.googlePlus.login({
      // 'scopes':'https://www.googleapis.com/auth/userinfo.profile',
      'webClientId': '193003617596-f3gi7se22k1slo7lrh3csnuut4jbrnvg.apps.googleusercontent.com',
      'offline': true
    })
    .then((res) => {
      debugger;
      console.log(res)
    })
    .catch((err) => {
      debugger;
      console.error(err)
    });
  }

}
