import { Component } from '@angular/core';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  constructor() { }

  async loginGoogle() {
    this.user = await GoogleAuth.signIn();
    console.log(this.user);
    // GoogleAuth.signOut()
    //GoogleAuth.refresh() 
  }
}
