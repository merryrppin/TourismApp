import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitioTuristicoPage } from './sitio-turistico.page';

const routes: Routes = [
  {
    path: '',
    component: SitioTuristicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitioTuristicoPageRoutingModule {}
