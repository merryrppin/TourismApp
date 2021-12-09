import { Component } from '@angular/core';
import { GeneralService } from '../../core/General/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage  {

  constructor(private generalService:GeneralService) { }
  
  enviarParametroGeneral(categoria:string){
    this.generalService.setCategoria(categoria);
  }


}
