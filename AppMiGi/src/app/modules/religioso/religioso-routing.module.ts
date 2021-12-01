import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReligiosoPage } from './religioso.page';

const routes: Routes = [
  {
    path: '',
    component: ReligiosoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReligiosoPageRoutingModule {}
