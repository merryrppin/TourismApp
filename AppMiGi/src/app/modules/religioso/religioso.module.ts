import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReligiosoPageRoutingModule } from './religioso-routing.module';

import { ReligiosoPage } from './religioso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReligiosoPageRoutingModule
  ],
  declarations: [ReligiosoPage]
})
export class ReligiosoPageModule {}
