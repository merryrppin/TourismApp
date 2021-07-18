import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./modules/maps/maps.module').then( m => m.MapsPageModule)
  },  {
    path: 'maps',
    loadChildren: () => import('./modules/maps/maps.module').then( m => m.MapsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
