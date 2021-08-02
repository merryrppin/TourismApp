import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonHeaderPageRoutingModule } from './ion-header-routing.module';

import { IonHeaderPage } from './ion-header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonHeaderPageRoutingModule
  ],
  declarations: [IonHeaderPage],
  entryComponents: [IonHeaderPage],
  exports: [IonHeaderPage]
})
export class IonHeaderPageModule {}
