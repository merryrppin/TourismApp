import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit   {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input() images: string[];
  @Input() index: number;

  mySlideOptions : any;
  

  constructor(private modalController: ModalController) {    

  }

  ngOnInit() {

    this.mySlideOptions = {
      initialSlide: this.index,
      loop: false      
    }
    
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
