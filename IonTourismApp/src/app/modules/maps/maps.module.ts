import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';
import { IonAccordionModule } from 'src/app/shared/customcontrols/ion-accordion/ion-accordion.module';
import {IonHeaderPageModule} from 'src/app/shared/CustomControls/ion-header/ion-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageRoutingModule,
    IonAccordionModule,
    IonHeaderPageModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
