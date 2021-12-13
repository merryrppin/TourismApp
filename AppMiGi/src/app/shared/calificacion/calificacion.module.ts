import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CalificacionComponent } from './calificacion.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CalificacionComponent],
  entryComponents: [CalificacionComponent],
  exports: [CalificacionComponent]
})
export class CalificacionModule {}
