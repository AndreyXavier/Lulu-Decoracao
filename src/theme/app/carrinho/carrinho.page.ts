import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {

  constructor(private NavCtrl: NavController) {}

  goBack() {
    this.NavCtrl.navigateForward('tabs/tab1', {animated: false });
  }


  goToPagamento() {
    this.NavCtrl.navigateForward('/pagamentos',  { animated: false});
  }

}
