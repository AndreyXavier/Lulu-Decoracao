import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private NavCtrl: NavController) {}

  goToCarrinho() {
    this.NavCtrl.navigateForward('/carrinho',  { animated: false});
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen: boolean) {
    this.isModalOpen1 = isOpen;
  }

  isModalOpen2 = false;

  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  isModalOpen3 = false;

  setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
  }
}
