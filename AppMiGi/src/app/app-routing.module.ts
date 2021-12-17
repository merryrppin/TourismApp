import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./shared/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'genericmap',
    loadChildren: () => import('./genericmap/genericmap.module').then( m => m.GenericmapPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./modules/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'sitio-turistico',
    loadChildren: () => import('./modules/sitio-turistico/sitio-turistico.module').then( m => m.SitioTuristicoPageModule)
  },
  {
    path: 'menu-categorias',
    loadChildren: () => import('./modules/menu-categorias/menu-categorias.module').then(m => m.MenuCategoriasPageModule)
  },  {
    path: 'modal',
    loadChildren: () => import('./shared/modal/modal.module').then( m => m.ModalPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
