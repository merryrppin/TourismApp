import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MenuPage,
    children: [
      {
        path:'', loadChildren: '../../modules/inicio/inicio.module#InicioPageModule'
      },
/*       {
        path: 'religioso',
        loadChildren: () => import('../../modules/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'senderismo',
        loadChildren: () => import('../../modules/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'gastronomico',
        loadChildren: () => import('../../modules/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../modules/inicio/inicio.module').then(m => m.InicioPageModule)
      }, */
      {
        path: '',
        redirectTo: '/tabs/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
