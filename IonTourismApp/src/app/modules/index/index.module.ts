import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import {IonHeaderPageModule} from 'src/app/shared/CustomControls/ion-header/ion-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    IonHeaderPageModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
