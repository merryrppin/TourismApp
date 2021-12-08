import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCategoriasPage } from './menu-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCategoriasPageRoutingModule {}
