import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainLayoutPageRoutingModule } from './main-layout-routing.module';

import { MainLayoutPage } from './main-layout.page';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes =[
  {
    path: "",
    redirectTo: "/_mainLayout/scan-qr",
    pathMatch:"full"
  },
  {
    path: '_mainLayout',
    component: MainLayoutPage,
    children:[
      { path: "", redirectTo:"/_mainLayout/scan-qr", pathMatch:"full"},  
/*       { path: "maps", loadChildren: () => import('src/app/modules/maps/maps.module').then( m => m.MapsPageModule)},*/
      { path: 'scan-qr', loadChildren: () => import('src/app/modules/scan-qr/scan-qr.module').then( m => m.ScanQRPageModule)} , 
      {path: 'index',loadChildren: () => import('src/app/modules/index/index.module').then( m => m.IndexPageModule) }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainLayoutPage]
})
export class MainLayoutPageModule {}
