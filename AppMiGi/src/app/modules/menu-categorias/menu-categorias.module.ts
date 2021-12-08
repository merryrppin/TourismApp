import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCategoriasPageRoutingModule } from './menu-categorias-routing.module';

import { MenuCategoriasPage } from './menu-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCategoriasPageRoutingModule
  ],
  declarations: [MenuCategoriasPage]
})
export class MenuCategoriasPageModule {}
