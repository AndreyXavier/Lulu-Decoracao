import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage {

  constructor(private NavCtrl: NavController) {}

  goBack() {
    this.NavCtrl.navigateForward('/carrinho', {animated: false });
  }

}
