import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/General/general.service';
import { StorageService } from 'src/app/core/Services/storage/storage.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    private navController: NavController,
    private generalService: GeneralService,
    private storage: StorageService) { }

  ngOnInit() {
    this.storage.getIdioma("Language").then(resp => {
      let respLang = resp.value == null ? "ESP" : resp.value;
      this.generalService.setCurrentLanguage(respLang);
    });
  }

  scanPage(){
    this.navController.navigateRoot(["/_mainLayout/scan-qr"]);
  }
  mapsPage(){
    this.navController.navigateRoot(["/_mainLayout/scan-qr"]);
  }

  async setLanguage(selectedLanguage:string){
    await this.storage.setIdioma("Language", selectedLanguage);
    this.generalService.setCurrentLanguage(selectedLanguage);
  }

  getCurrentLanguage(): string {
    return this.generalService.getCurrentLanguage();
  }

  getCurrentLanguageESP(): boolean {
    return this.generalService.getCurrentLanguage() == "ESP";
  }

}
