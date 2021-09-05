import { IonAccordionComponent } from "./ion-accordion.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [IonAccordionComponent],
  entryComponents: [IonAccordionComponent],
  exports: [IonAccordionComponent]
})
export class IonAccordionModule {}
