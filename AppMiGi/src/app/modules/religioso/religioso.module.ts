import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReligiosoPageRoutingModule } from './religioso-routing.module';

import { ReligiosoPage } from './religioso.page';
import { IonAccordionModule } from 'src/app//Shared/ion-accordion/ion-accordion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReligiosoPageRoutingModule,
    IonAccordionModule
  ],
  declarations: [ReligiosoPage]
})
export class ReligiosoPageModule {}
