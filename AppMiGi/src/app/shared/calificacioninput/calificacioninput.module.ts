import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CalificacioninputComponent } from './calificacioninput.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CalificacioninputComponent],
  entryComponents: [CalificacioninputComponent],
  exports: [CalificacioninputComponent]
})
export class CalificacioninputModule {}
