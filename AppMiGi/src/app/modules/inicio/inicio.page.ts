import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { GeneralService } from 'src/app/core/General/general.service';
import { IonButton, NavController } from '@ionic/angular';
import { Router, NavigationExtras,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  imgsenderismo:any[] = [{img:"https://1.bp.blogspot.com/-rgeqbzl6U1g/UXFz6UvjG-I/AAAAAAAABO0/TdbJnpN6EVo/s1600/20130224_130204.jpg"},{img:"https://1.bp.blogspot.com/-7ZK1Uu53mVM/V6ifv_RXn-I/AAAAAAAAA5Q/mrcIZP_m3Ow5n0G0goBocd4g5rgnZ345gCK4B/s1600/air%2Bterjun%2Bcicurug.jpg"}]
  imgreligioso:any[]=[{img:"https://i.pinimg.com/originals/12/ee/b9/12eeb9ea35bad398b6e4018a2b8c2235.jpg"},{img:"https://live.staticflickr.com/7376/13838534255_3187b0670d_z.jpg"}]
  imggastronomico:any[] = [{img:"https://media-cdn.tripadvisor.com/media/photo-s/1b/1d/70/1a/img-20200308-131106-largejpg.jpg"},{img:"https://4.bp.blogspot.com/-cMvwaeUJpSE/VoCGcVVmw0I/AAAAAAAAG_Y/Lvfnuz5sOFQ/s640/bdaf8831-bd83-48cb-8623-a380250b7bbb.jpg"}]
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  lang: string;
  sliderOne: any;
  visible : boolean = false;

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(   private nav: NavController,
    private router: Router,
    private route: ActivatedRoute, 
    private generalService: GeneralService  ) {
    this.lang = this.generalService.getCurrentLanguage();
    this.generalService.languageChangeSubject.subscribe((value) =>{
      this.lang = value;
    });
    //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]
    };

    this.visible=false;
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  cambiarIdioma(){
    this.lang  = this.lang === "ENG" ? "ESP" : "ENG";
    this.generalService.setCurrentLanguage(this.lang);
  }


  goToParties(){
    this.visible=false;
    let navigationExtras: NavigationExtras = {  };
    this.nav.navigateForward(['/tabs/parties'], navigationExtras);
  }
  

  goToPlaces(){
    this.visible=false;
    let navigationExtras: NavigationExtras = {  };
    this.nav.navigateForward(['/tabs/places'], navigationExtras);
  }

  goToInfo(){
    this.visible=false;
    let navigationExtras: NavigationExtras = {  };
    this.nav.navigateForward(['/tabs/info'], navigationExtras);
  }

  toggle(){

    if(this.visible){
      this.visible= false;
    }else{

      this.visible =true;
    }


  }

}