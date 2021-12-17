import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit   {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input() images: any[];
  @Input() index: number;

  mySlideOptions : any;
  

  constructor(private modalController: ModalController) {    

  }



  ngOnInit() {

    this.mySlideOptions = {
      initialSlide: this.index,
      loop: false ,     
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          let buttonnext = "";
          return '<span class="' + className + '">' + (index + 1) + '</span>' + buttonnext;
        },
      }
    };
    
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  cancel(){
    this.modalController.dismiss();
  }

}
