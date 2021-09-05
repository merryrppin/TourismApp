import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
})
export class MainLayoutPage implements OnInit {
  appPages = [
    { title: ' Inicio', titleENG: ' Home', url: '/_mainLayout/index', icon: '../../assets/images/menuhome.png' },
    { title: ' Girardota', titleENG: ' Girardota', url: '/_mainLayout/maps', icon: '../../assets/images/menumap.png' },
    { title: ' Escanear QR', titleENG: ' Scan QR', url: '/_mainLayout/qr', icon: '../../assets/images/menuscan.png' },
  ]

  @ViewChild("content") content: ElementRef
  constructor() { }

  ngOnInit() {
  }

}
