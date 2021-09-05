import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '_loginLayout', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./modules/login/login.module').then( m => m.LoginPageModule)},
  { path: '', loadChildren: () => import('./layout/main-layout/main-layout.module').then( m => m.MainLayoutPageModule)},
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  },
/*   {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginPageModule)
  }, */
  {
    path: 'maps',
    loadChildren: () => import('./modules/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./modules/scan-qr/scan-qr.module').then( m => m.ScanQRPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./modules/index/index.module').then( m => m.IndexPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
