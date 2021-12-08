import { Component, OnInit } from '@angular/core';
import { SyncService } from '../../core/sync/sync.service';
import { GeneralService } from '../../core/General/general.service';
@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.page.html',
  styleUrls: ['./menu-categorias.page.scss'],
})
export class MenuCategoriasPage implements OnInit {
  public categoria:string;
  public menu:any[];
  constructor(private syncService:SyncService,private generalService:GeneralService) { 
    this.categoria=this.generalService.getCategoriaActual();
    this.getMenu();
  }

  ngOnInit() {
  }

  async getMenu(){
    let data = '{"StoredParams":[{"Name":"IdMunicipio", "Value":"-1"},{"Name":"CodigoTipoSitio","Value":"' + this.categoria + '"}],"StoredProcedureName":"ObtenerSitiosTuristicos"}';
    let result = await this.syncService.obtenerInformacionSP(data);
    this.menu = result;
  }
  

}
