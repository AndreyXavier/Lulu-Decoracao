import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { NavController } from '@ionic/angular';
register();


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  activeTab: string = 'destaques'; // Inicializa a aba ativa como 'destaques'

  constructor(private NavCtrl: NavController) {}

  goToCarrinho() {
    this.NavCtrl.navigateForward('/carrinho',  { animated: false});
  }

  selectTab(tabName: string) {
    this.activeTab = tabName; // Atualiza a aba ativa
  }
}