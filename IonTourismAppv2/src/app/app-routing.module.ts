import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginPageModule)
  },
/*   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, */
  {
    path: '',
    redirectTo: '_mainLayout',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "_mainLayout",
    pathMatch: "full"
  },
  {
    path: 'index',
    loadChildren: () => import('./modules/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./modules/scan-qr/scan-qr.module').then( m => m.ScanQRPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/main-layout/main-layout.module').then( m => m.MainLayoutPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
