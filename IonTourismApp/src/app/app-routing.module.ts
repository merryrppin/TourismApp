import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '_mainLayout',
    pathMatch: 'full'
  },
  { path: '', loadChildren: () => import('./layout/main-layout/main-layout.module').then( m => m.MainLayoutPageModule)},
  {
    path: "**",
    redirectTo: "_mainLayout",
    pathMatch: "full"
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./modules/maps/maps.module').then( m => m.MapsPageModule)
  },  {
    path: 'qr',
    loadChildren: () => import('./modules/qr/qr.module').then( m => m.QrPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
