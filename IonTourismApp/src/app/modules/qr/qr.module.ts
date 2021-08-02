import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import {IonHeaderPageModule} from 'src/app/shared/CustomControls/ion-header/ion-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule,
    IonHeaderPageModule
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
