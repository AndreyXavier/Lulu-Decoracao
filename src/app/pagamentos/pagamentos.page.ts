import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { Quadro } from '../quadro';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {
  user: any;
  enderecoTeste: any = '';
  totalDoCarrinho: number = 0;
  selectedPaymentMethod: string = '';
  quadrosCarrinho: any = [];

  constructor(
    private NavCtrl: NavController,
    private router: Router,
    private afAuth: AngularFireAuth,
    private usuarioCrud: UsuarioCrudService,
    private modalController: ModalController,
    private carrinhoService: CarrinhoService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (
      currentNavigation &&
      currentNavigation.extras &&
      currentNavigation.extras.state
    ) {
      this.quadrosCarrinho = currentNavigation.extras.state['quadrosCarrinho'];
      this.user = currentNavigation.extras.state['user'];
      this.totalDoCarrinho = currentNavigation.extras.state['totalDoCarrinho'];
    }
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        await this.usuarioCrud
          .obterUsuario(user.uid)
          .subscribe((dadosUsuario) => {
            this.user = dadosUsuario;
          });
      }
    });
  }

  editar() {
    this.NavCtrl.navigateForward('/editdestino', {
      animated: false,
      state: {
        user: this.user,
      },
    });
  }

  goBack() {
    this.NavCtrl.navigateForward('/carrinho', { animated: false });
  }

  async limpaCarrinho() {
    this.quadrosCarrinho.forEach((quadro: any) => {
      this.remove(quadro);
    });
  }

  async remove(quadroParaRemover: Quadro) {
    await this.carrinhoService.removerDoCarrinho(quadroParaRemover.cartItemId);
  }

  async goBack1() {
    this.setOpen(false);
    await this.modalController.dismiss();
    await this.limpaCarrinho();
    this.NavCtrl.navigateRoot('/tabs/tab1');
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
