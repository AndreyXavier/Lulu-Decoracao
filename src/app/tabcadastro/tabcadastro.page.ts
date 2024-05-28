import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabcadastro',
  templateUrl: './tabcadastro.page.html',
  styleUrls: ['./tabcadastro.page.scss'],
})

export class TabcadastroPage {
  endereco = {
    logradouro: '',
    bairro: ''
  };

  carregandoCEP = false;

  constructor(private http: HttpClient, private NavCtrl: NavController) {}

  goBack() {
    this.NavCtrl.navigateForward('tabs/tab3', {animated: false });
  }

  consultarCEP(event: any) {
    const cep = event.detail.value;
    if (cep && cep.length === 8 && /^\d{8}$/.test(cep)) {
      this.carregandoCEP = true;
  
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((data: any) => {
          if (data.uf === 'RJ') { // Verifica se o CEP é do estado do Rio de Janeiro
            this.endereco.logradouro = data.logradouro;
            this.endereco.bairro = data.bairro;
            this.carregandoCEP = false;
          } else {
            // Limpa os campos se o CEP não pertencer ao RJ
            this.endereco.logradouro = '';
            this.endereco.bairro = '';
            this.carregandoCEP = false;
          }
        });
    } else {
      // Limpa os campos de endereço se o CEP não estiver no formato correto
      this.endereco.logradouro = '';
      this.endereco.bairro = '';
      this.carregandoCEP = false;
    } 
  }
}