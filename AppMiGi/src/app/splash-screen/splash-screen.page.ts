import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
    var objThis = this;
    setTimeout(function(){
      objThis.navController.navigateRoot(["/login"]).then(() => { })
    }, 6000);
  }

}
