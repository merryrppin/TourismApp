import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericmapPageRoutingModule } from './genericmap-routing.module';

import { GenericmapPage } from './genericmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericmapPageRoutingModule
  ],
  declarations: [GenericmapPage]
})
export class GenericmapPageModule {}
