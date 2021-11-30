import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private googlePlus: GooglePlus, private fb: Facebook) { }

  ngOnInit() {
  }

  userLogin: any = {};
  loginGoogle() {
    this.googlePlus.login({
      // 'scopes':'https://www.googleapis.com/auth/userinfo.profile',
      'webClientId': '193003617596-f3gi7se22k1slo7lrh3csnuut4jbrnvg.apps.googleusercontent.com',
      'offline': true
    })
      .then((res) => {
        debugger;
        console.log(res);
      })
      .catch((err) => {
        debugger;
        console.error(err);
      });
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        debugger;
        console.log('Logged into Facebook!', res);

        this.fb.api("me?fields=id,name,email,picture.width(500).height(500)", ["public_profile", "email"])
        .then(function(resp){
          debugger;
        })
        .catch(function(err){
          debugger;
        });
      })
      .catch(e => {
        debugger;
        console.log('Error logging into Facebook', e);
      });
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  logoutFacebook(){
    this.fb.logout()
    .then(function(resp){
      debugger;
    })
    .catch(function(err){
      debugger;
    })
  }
}
