import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
})
export class MainLayoutPage implements OnInit {
  appPages = [
    { title: ' Girardota', url: '/_mainLayout/maps', icon: '/assets/images/marcacion.svg' },
    { title: ' Escanear QR', url: '/_mainLayout/qr', icon: 'qr-scanner' },
  ]

  @ViewChild("content") content: ElementRef
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  openMenu() {
    this.renderer.setAttribute(this.content.nativeElement, "style","max-width:80%");
  }
  closeMenu() {
    this.renderer.removeAttribute(this.content.nativeElement, "style");
  }
}
