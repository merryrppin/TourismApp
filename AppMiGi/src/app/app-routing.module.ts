import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./shared/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'genericmap',
    loadChildren: () => import('./genericmap/genericmap.module').then( m => m.GenericmapPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./modules/perfil/perfil.module').then( m => m.PerfilPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
