import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';
import { IonAccordionModule } from 'src/app/shared/customcontrols/ion-accordion/ion-accordion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageRoutingModule,
    IonAccordionModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
