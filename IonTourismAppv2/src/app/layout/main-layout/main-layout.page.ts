import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { GeneralService } from 'src/app/core/General/general.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/Services/storage/storage.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
})
export class MainLayoutPage implements OnInit {
  appPages = [
    { title: ' Inicio', titleENG: ' Home', url: '/_mainLayout/index', icon: '../../assets/images/menuhome.png' },
    { title: ' Girardota', titleENG: ' Girardota', url: '/_mainLayout/maps', icon: '../../assets/images/menumap.png' },
    { title: ' Escanear QR', titleENG: ' Scan QR', url: '/_mainLayout/scan-qr', icon: '../../assets/images/menuscan.png' },
  ]

  @ViewChild("content") content: ElementRef
  constructor(private generalService:GeneralService,
    private navController:NavController,
    private storage: StorageService) { }

  ngOnInit() {
  }

  changeLanguage(language:string){
    this.generalService.setCurrentLanguage(language);
  }

  getLanguage():string{
    return this.generalService.getCurrentLanguage();
  }

  logout(){
    this.storage.setUser("User", null);
    GoogleAuth.signOut().then(()=>{
      this.navController.navigateRoot(["/_mainLayout/login"]);
    })
  }
}
