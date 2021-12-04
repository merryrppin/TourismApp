import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericmapPage } from './genericmap.page';

const routes: Routes = [
  {
    path: '',
    component: GenericmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericmapPageRoutingModule {}
