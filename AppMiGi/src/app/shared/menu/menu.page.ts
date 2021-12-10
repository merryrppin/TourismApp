import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../../core/General/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage  {
lang: string;
  constructor(private generalService:GeneralService) { 
    this.lang = this.generalService.currentLanguage;  
    this.generalService.languageChangeSubject.subscribe((value) =>{
      this.lang = value;
    });
  }

  enviarParametroGeneral(categoria:string){
    this.generalService.setCategoria(categoria);
  }



}
