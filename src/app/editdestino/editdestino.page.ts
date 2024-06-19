import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ViacepService } from '../services/viacep.service';
import { NavController } from '@ionic/angular';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-editdestino',
  templateUrl: './editdestino.page.html',
  styleUrls: ['./editdestino.page.scss'],
})
export class EditdestinoPage {
  cadastroForm: FormGroup;
  dadosEndereco: any; // suporte à função cep
  endereçoDestino: any; // a ser preenchido após a validação dos inputs
  user: any; //usuário trazido para alteração de endereço

  constructor(
    private authService: AuthService,
    private router: Router,
    private viaCepService: ViacepService,
    private NavCtrl: NavController,
    private usuarioCrud: UsuarioCrudService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (
      currentNavigation &&
      currentNavigation.extras &&
      currentNavigation.extras.state
    ) {
      this.user = currentNavigation.extras.state['user'];
    }
    this.cadastroForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      complemento: ['', [Validators.required]],
    });
  }

  // Método para registrar o usuário
  async edit() {
    if (this.cadastroForm.invalid) {
      for (const controlName in this.cadastroForm.controls) {
        const control = this.cadastroForm.get(controlName);
        if (control && control.invalid) {
          let message = '';
          switch (controlName) {
            case 'cep':
              message = 'Preencha o campo cep.';
              break;
            case 'numero':
              message = 'Informe o número da sua residência.';
              break;
            case 'complemento':
              message = 'Informe o complemento da sua residência.';
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

    const { cep, logradouro, bairro, numero, complemento } =
      this.cadastroForm.value;

    try {
      this.endereçoDestino = await {
        cep: cep,
        endereco: logradouro,
        bairro: bairro,
        numero: numero,
        complemento: complemento,
      };
      //Agora que setou o endereço de destino, altero o do usuário
      await this.afAuth.authState.subscribe(async (user) => {
        if (user) {
          await this.usuarioCrud.atualizarUsuario(user.uid, {
            cep: this.endereçoDestino.cep,
            endereco: this.endereçoDestino.endereco,
            bairro: this.endereçoDestino.bairro,
            numero: this.endereçoDestino.numero,
            complemento: this.endereçoDestino.complemento,
          });
        }
      });
      await this.showToast('success', 2000, 'Endereço atualizado com sucesso!');
      //Uma vez alterao, volto para a página
      await this.NavCtrl.navigateForward('/pagamentos', {
        animated: false,
        state: {
          user: this.user,
        },
      });

    } catch (error) {
      console.error('Erro ao editar:', error);
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
