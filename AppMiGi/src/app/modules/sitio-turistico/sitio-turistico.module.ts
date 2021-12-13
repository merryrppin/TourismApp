import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitioTuristicoPageRoutingModule } from './sitio-turistico-routing.module';

import { SitioTuristicoPage } from './sitio-turistico.page';
import { IonAccordionModule } from 'src/app//Shared/ion-accordion/ion-accordion.module';
import { CalificacionModule } from 'src/app/shared/calificacion/calificacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitioTuristicoPageRoutingModule,
    IonAccordionModule,
    CalificacionModule
  ],
  declarations: [SitioTuristicoPage]
})
export class SitioTuristicoPageModule {}
