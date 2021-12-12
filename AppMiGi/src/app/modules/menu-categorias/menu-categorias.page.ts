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
  public categoria: string;
  public menu: any[];
  lang: string;
  loading:any;
  constructor(
    private syncService: SyncService,
    private generalService: GeneralService,
    private navController: NavController) {
    this.lang = this.generalService.getCurrentLanguage();
    this.generalService.languageChangeSubject.subscribe((value) => {
      this.lang = value;
    });
    this.categoria = this.generalService.getCategoriaActual();
    this.getMenu();
  }

  ngOnInit() {
  }

  async openLoading() {
    this.loading = await this.generalService.presentLoading({
      message: this.lang == 'ENG' ? "Please wait..." : "Por favor espere...",
      keyboardClose: false
    });
  }

  async getMenu() {
    await this.openLoading();
    this.generalService.getDataPromise("sitiosTuristicos").then(async (resp) => {
      if (resp.value == null) {
        let data = '{"StoredParams":[{"Name":"IdMunicipio", "Value":"-1"}],"StoredProcedureName":"ObtenerSitiosTuristicos"}';
        let result = await this.syncService.obtenerInformacionSP(data);
        this.generalService.setDataPromise("sitiosTuristicos", JSON.stringify(result));
        this.menu = result.filter(x => x.Codigo == this.categoria);
      }else{
        this.menu = JSON.parse(resp.value).filter(x => x.Codigo == this.categoria);
      }
      this.loading.dismiss();
    });
  }

  sitioTuristico(item: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        IdSitioTuristico: item.IdSitioTuristico,
        categoria: this.categoria
      }
    };
    this.navController.navigateForward(["/sitio-turistico"], navigationExtras);
  }

  cambiarIdioma() {
    this.lang = this.lang === "ENG" ? "ESP" : "ENG";
    this.generalService.setCurrentLanguage(this.lang);
  }

  fnAtras() {
    this.navController.navigateBack(["/tabs/inicio"]);
  }

}
