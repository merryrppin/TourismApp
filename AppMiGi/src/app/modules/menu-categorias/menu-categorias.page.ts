import { Component, OnInit } from '@angular/core';
import { SyncService } from '../../core/sync/sync.service';
import { GeneralService } from '../../core/General/general.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.page.html',
  styleUrls: ['./menu-categorias.page.scss'],
})
export class MenuCategoriasPage implements OnInit {
  public categoria:string;
  public menu:any[];
  lang: string;
  txtMejorRuta: string;
  constructor(
    private syncService:SyncService,
    private generalService:GeneralService,
    private navController: NavController) { 
    this.lang = this.generalService.getCurrentLanguage();
    this.categoria = this.generalService.getCategoriaActual();
    this.getMenu();
    this.txtMejorRuta = this.lang == "ENG" ? "Best route" : "Mejor ruta";
  }

  ngOnInit() {
  }

  async getMenu(){
    let data = '{"StoredParams":[{"Name":"IdMunicipio", "Value":"-1"},{"Name":"CodigoTipoSitio","Value":"' + this.categoria + '"}],"StoredProcedureName":"ObtenerSitiosTuristicos"}';
    let result = await this.syncService.obtenerInformacionSP(data);
    this.menu = result;
  }
  
  mejorRuta(item:any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          itemData: JSON.stringify(item),
          categoria: this.categoria
      }
    };
    this.navController.navigateRoot(["/genericmap"], navigationExtras);

  }
}
