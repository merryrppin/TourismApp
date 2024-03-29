import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MenuPage,
    children: [
      {
        path:'inicio',
        children:[
          {
            path: '',
            loadChildren: () => import('../../modules/inicio/inicio.module').then(m => m.InicioPageModule)
          }

        ]

      },
      {
        path: 'religioso',
        children:[
          {
            path: '',
            loadChildren: () => import('../../modules/menu-categorias/menu-categorias.module').then(m => m.MenuCategoriasPageModule)
          }

        ]
      },
      {
        path: 'senderismo',
        children:[
          {
            path: '',
            loadChildren: () => import('../../modules/menu-categorias/menu-categorias.module').then(m => m.MenuCategoriasPageModule)
          }

        ]
      },
      {
        path: 'gastronomico',
        children:[
          {
            path: '',
            loadChildren: () => import('../../modules/menu-categorias/menu-categorias.module').then(m => m.MenuCategoriasPageModule)
          }

        ]
      },
      {
        path: 'perfil',
        children:[
          {
            path: '',
            loadChildren: () => import('../../modules/perfil/perfil.module').then(m => m.PerfilPageModule)
          }

        ]
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
