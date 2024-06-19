import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { Quadro } from '../quadro';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  user: any;
  quadrosCarrinho: any[] = [];
  totalQuadros: number = 0;
  totalDoCarrinho: number = 0;

  constructor(
    private NavCtrl: NavController,
    private afAuth: AngularFireAuth,
    private usuarioCrud: UsuarioCrudService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.carrinhoService.quadrosCarrinho$.subscribe((quadros) => {
      this.quadrosCarrinho = quadros;
      this.totalQuadros = this.quadrosCarrinho.length;
      this.calculaCarrinho();
    });
  }

  calculaCarrinho() {
    this.totalDoCarrinho = 5;
    this.quadrosCarrinho.forEach((quadro) => {
      this.totalDoCarrinho += quadro.preco;
    });
  }

  async remove(quadroParaRemover: Quadro) {
    this.carrinhoService.removerDoCarrinho(quadroParaRemover.cartItemId);
    await this.showToast('success', 1500, 'Quadro removido com sucesso');
  }

  async goToPagamento() {
    await this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        await this.usuarioCrud
          .obterUsuario(user.uid)
          .subscribe(async(dadosUsuario) => {
            this.user = await{
              endereco: dadosUsuario.endereco ||'',
              bairro: dadosUsuario.bairro ||'',
              cep: dadosUsuario.cep ||'',
              complemento: dadosUsuario.complemento ||'',
              numero: dadosUsuario.numero ||'',
              nome: dadosUsuario.nome,
              email: dadosUsuario.email,

            };
            this.NavCtrl.navigateForward('/pagamentos', {
              animated: false,
              state: {
                user: this.user,
                quadrosCarrinho: this.quadrosCarrinho,
                totalDoCarrinho: this.totalDoCarrinho,
              },
            });
          });
      } else {
        this.NavCtrl.navigateForward('/tabs/tab3', {
          animated: false,
          state: { fromCarrinho: true },
        });
      }
    });
  }

  goBack() {
    this.NavCtrl.navigateForward('tabs/tab1', { animated: false });
  }

  async showToast(color: string, time: number, message: string) {
    await this.toastService.presentToast(color, time, message);
  }
}
