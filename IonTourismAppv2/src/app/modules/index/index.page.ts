import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/General/general.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    private navController: NavController,
    private generalService: GeneralService) { }

  ngOnInit() {
  }

  scanPage(){
    this.navController.navigateRoot(["/_mainLayout/scan-qr"]);
  }
  mapsPage(){
    this.navController.navigateRoot(["/_mainLayout/scan-qr"]);
  }

  setLanguage(selectedLanguage:string){
    this.generalService.setCurrentLanguage(selectedLanguage);
  }

  getCurrentLanguage(): string {
    return this.generalService.getCurrentLanguage();
  }

  getCurrentLanguageESP(): boolean {
    return this.generalService.getCurrentLanguage() == "ESP";
  }

}
