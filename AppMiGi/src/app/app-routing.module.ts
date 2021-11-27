import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
/*   {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then( m => m.InicioPageModule)
  }, */
  {
    path: 'menu',
    loadChildren: () => import('./shared/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
/*   {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then( m => m.InicioPageModule)
  }, */
  {
    path: 'menu',
    loadChildren: () => import('./shared/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
