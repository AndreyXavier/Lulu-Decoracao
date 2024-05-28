import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  constructor(private platform: Platform, private location: Location) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.location.isCurrentPathEqualTo('tabs/tab1')) {
          App.exitApp(); // Se estiver na tela inicial, saia do app
        } else {
          this.location.back(); // Caso contrário, volte para a tela anterior
        }
      });
    });
  }
}