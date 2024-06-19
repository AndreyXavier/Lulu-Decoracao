
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ViacepService } from '../services/viacep.service';
import { NavController } from '@ionic/angular';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabcadastro',
  templateUrl: './tabcadastro.page.html',
  styleUrls: ['./tabcadastro.page.scss'],
})
export class TabcadastroPage {
  cadastroForm: FormGroup;
  dadosEndereco: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viaCepService: ViacepService,
    private NavCtrl: NavController,
    private usuarioCrud: UsuarioCrudService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.cadastroForm = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      complemento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para registrar o usuário
  async register() {
    if (this.cadastroForm.invalid) {
      for (const controlName in this.cadastroForm.controls) {
        const control = this.cadastroForm.get(controlName);
        if (control && control.invalid) {
          let message = '';
          switch (controlName) {
            case 'nomeCompleto':
              message =
                'Informe seu nome completo com pelo menos 5 caracteres.';
              break;
            case 'cep':
              message = 'Preencha o campo cep.';
              break;
            case 'numero':
              message = 'Informe o número da sua residência.';
              break;
            case 'complemento':
              message = 'Informe o complemento da sua residência.';
              break;
            case 'email':
              message = 'Informe um email válido.';
              break;
            case 'senha':
              message = 'Informe uma senha com pelo menos 6 caracteres.';
              break;
            default:
              message = 'Preencha todos os campos corretamente.';
          }
          await this.showToast('warning', 2000, message);
          control.markAsTouched();
          return;
        }
      }
    }

    const {
      nomeCompleto,
      cep,
      logradouro,
      bairro,
      numero,
      complemento,
      email,
      senha,
    } = this.cadastroForm.value;

    try {
      const userCredential = await this.authService.signUpWithEmail(
        email,
        senha
      );
      if (userCredential.user) {
        const uid = userCredential.user.uid;

        const dadosUsuario = {
          nome: nomeCompleto,
          email: email,
          cep: cep,
          endereco: logradouro,
          bairro: bairro,
          numero: numero,
          complemento: complemento,
        };

        await this.usuarioCrud.adicionarUsuario(uid, dadosUsuario);
      } else {
        console.error('Autenticação falhou ou demorou demais');
      }
      this.router.navigate(['']);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  }

  // Método para consultar o CEP
  consultarCep() {
    const cep = this.cadastroForm.get('cep')?.value;
    if (!cep || !cep.match(/^[0-9]{8}$/)) {
      this.showToast('warning', 1500, 'Digite um CEP válido');
      return;
    }

    this.viaCepService.getEndereco(cep).subscribe(
      (data) => {
        console.log(data);
        this.dadosEndereco = data;
        this.cadastroForm.patchValue({
          logradouro: this.dadosEndereco.logradouro,
          bairro: this.dadosEndereco.bairro,
        });
      },
      (error) => {
        console.error('Erro ao consultar o CEP', error);
        this.cadastroForm.patchValue({
          logradouro: '',
          bairro: '',
        });
      }
    );
  }
  //método de avisos
  async showToast(color: string, time: number, message: string) {
    await this.toastService.presentToast(color, time, message);
  }

  goBack() {
    this.NavCtrl.navigateForward('tabs/tab3', { animated: false });
  }
}
