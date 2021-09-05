import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  scanPage(){
    this.navController.navigateRoot(["/_mainLayout/scan-qr"]);
  }

}
