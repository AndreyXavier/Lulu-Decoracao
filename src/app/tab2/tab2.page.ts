import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { QuadroCrudService } from '../services/quadro-crud.service';
import { CarrinhoService } from '../services/carrinho.service';
import { Quadro } from '../quadro';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  quadros: any[] = [];
  quadros_animacoes_desenho: any[] = [] ;
  quadros_filmes_series: any[] = [] ;
  quadros_churrasco: any[] = [] ;
  quadros_bebidas: any[] = [] ;

  constructor(
    private NavCtrl: NavController,
    private quadroCrudService: QuadroCrudService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastService

  ) {}

  ngOnInit() {
    this.obterQuadros();
  }

  goToCarrinho() {
    this.NavCtrl.navigateForward('/carrinho', { animated: false });
  }

  uniqueModalId(quadro: Quadro, index: number): string {
    return `tab2-open-modal-${quadro.uid}-${index}`;
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

  addQuadro(quadro: Quadro) {
    try {
      this.carrinhoService.adicionarAoCarrinho(quadro);
      this.showToast('success', 1500, 'Quadro adicionado ao carrinho')
    } catch (error) {
      console.error('Erro ao adicionar quadro ao carrinho:', error);
    }
  }

  obterQuadros() {
    this.quadroCrudService.obterQuadros().subscribe(
      (quadros) => {
        this.quadros = quadros;
        for (let i = 0; i < this.quadros.length; i++) {
          switch (this.quadros[i]['categoria']) {
            case 'animacoes_desenho':
              this.quadros_animacoes_desenho.push(this.quadros[i]);
              break;
            case 'filmes_series':
              this.quadros_filmes_series.push(this.quadros[i]);
              break;
            case 'churrasco':
              this.quadros_churrasco.push(this.quadros[i]);
              break;
            case 'bebidas':
              this.quadros_bebidas.push(this.quadros[i]);
              break;
          }
        }
      },
      (error) => {
        console.error('Erro ao obter quadros:', error);
      }
    );
  }
  async showToast(
    color: string,
    time: number,
    message: string
  ) {
    await this.toastService.presentToast(color, time, message);
  }
}
