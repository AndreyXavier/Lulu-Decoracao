import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Quadro } from '../quadro';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private quadrosCarrinhoSubject = new BehaviorSubject<Quadro[]>([]);
  private quadrosCarrinhoDebounce = new Subject<Quadro[]>();
  quadrosCarrinho$ = this.quadrosCarrinhoSubject.asObservable();

  constructor() {
    this.quadrosCarrinhoDebounce
      .pipe(debounceTime(300))
      .subscribe((quadros) => {
        this.quadrosCarrinhoSubject.next(quadros);
      });
  }

  async adicionarAoCarrinho(quadro: Quadro) {
    try {
      // Gera um cartItemId único para o novo quadro
      const quadroComId = { ...quadro, cartItemId: this.generateUniqueId() };
      const quadrosAtualizados = [...this.quadrosCarrinhoSubject.value, quadroComId];
      this.quadrosCarrinhoSubject.next(quadrosAtualizados);
    } catch (error) {
      console.error('Erro ao adicionar quadro ao carrinho:', error);
      throw error;
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async removerDoCarrinho(cartItemId: string) {
    try {
      const quadrosAtualizados = this.quadrosCarrinhoSubject.value.filter(
        (quadro) => quadro.cartItemId !== cartItemId
      );
      this.quadrosCarrinhoSubject.next(quadrosAtualizados);
      console.log('Quadro removido do carrinho com sucesso');
    } catch (error) {
      console.error('Erro ao remover quadro do carrinho:', error);
      throw error;
    }
  }
}
