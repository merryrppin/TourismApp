import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { GeneralService } from 'src/app/core/Services/General/general.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
})
export class MainLayoutPage implements OnInit {
  appPages = [
    { title: ' Inicio', titleENG: ' Home', url: '/_mainLayout/index', icon: 'home' },
    { title: ' Girardota', titleENG: ' Girardota', url: '/_mainLayout/maps', icon: 'map' },
    { title: ' Escanear QR', titleENG: ' Scan QR', url: '/_mainLayout/qr', icon: 'barcode' },
  ]

  @ViewChild("content") content: ElementRef
  constructor(private renderer: Renderer2, private generalService:GeneralService) { }

  ngOnInit() {
  }
  openMenu() {
    this.renderer.setAttribute(this.content.nativeElement, "style","max-width:80%");
  }
  closeMenu() {
    this.renderer.removeAttribute(this.content.nativeElement, "style");
  }

  changeLanguage(language:string){
    this.generalService.setCurrentLanguage(language);
  }

  getLanguage():string{
    return this.generalService.getCurrentLanguage();
  }
}
