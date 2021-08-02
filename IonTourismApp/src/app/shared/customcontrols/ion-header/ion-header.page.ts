import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/Services/General/general.service';

@Component({
  selector: 'app-ion-header',
  templateUrl: './ion-header.page.html',
  styleUrls: ['./ion-header.page.scss'],
})
export class IonHeaderPage implements OnInit {

  constructor(private router: NavController,private general:GeneralService) { }

  ngOnInit() {
      
  }


}
