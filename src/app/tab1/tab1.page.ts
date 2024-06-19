import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { NavController } from '@ionic/angular';
import { QuadroCrudService } from '../services/quadro-crud.service';
import { CarrinhoService } from '../services/carrinho.service';
import { Quadro } from '../quadro';
import { ToastService } from '../services/toast.service';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

register();
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  quadros: any;
  quadrosAleatoriosDestaque: any[] = [];
  quadrosAleatoriosPromocao: any[] = [];
  activeTab: string = 'destaques'; // Inicializa a aba ativa como 'destaques'
  user: any;
  constructor(
    private NavCtrl: NavController,
    private quadroCrudService: QuadroCrudService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastService,
    private usuarioCrud: UsuarioCrudService,
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.afAuth.authState.subscribe((user) => {
      if (user) {
       const subscription = this.usuarioCrud.obterUsuario(user.uid).subscribe(async dadosUsuario => {
          await subscription.unsubscribe();
          this.user = await dadosUsuario;
          await this.cdr.detectChanges();
          console.log(this.user)
        });
      } else {
        this.user = null;
        this.cdr.detectChanges();
      }
    });
    await this.obterQuadros();
  }

  goToCarrinho() {
    this.NavCtrl.navigateForward('/carrinho', { animated: false });
  }

  selectTab(tabName: string) {
    this.activeTab = tabName; // Atualiza a aba ativa
  }

  async addQuadro(quadro: Quadro) {
    try {
      await this.carrinhoService.adicionarAoCarrinho(quadro);
      await this.showToast('success', 1500, 'Quadro adicionado ao carrinho')
    } catch (error) {
      console.error('Erro ao adicionar quadro ao carrinho:', error);
    }

  }

  async obterQuadros() {
    await this.quadroCrudService.obterQuadros().subscribe(
      (quadros) => {
        this.quadros = quadros;
        this.atribuirQuadros();
      },
      (error) => {
        console.error('Erro ao obter quadros:', error);
      }
    );
  }

  async atribuirQuadros() {
    this.quadrosAleatoriosDestaque = await this.quadros.slice(0, 4);
    this.quadrosAleatoriosPromocao = await this.quadros.slice(4, 8);
  }

  async showToast(
    color: string,
    time: number,
    message: string
  ) {
    await this.toastService.presentToast(color, time, message);
  }
}
