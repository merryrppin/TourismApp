import { GoogleMapComponent } from "./google-map.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [GoogleMapComponent],
  entryComponents: [GoogleMapComponent],
  exports: [GoogleMapComponent]
})
export class GoogleMapModule {}
