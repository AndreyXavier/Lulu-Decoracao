import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioCrudService } from '../services/usuario-crud.service';
import { TabsService } from '../services/tabs.service';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  email: string = '';
  password: string = '';
  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private usuarioCrud: UsuarioCrudService,
    private tabsService: TabsService,
    private navCtrl: NavController,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuarioCrud.obterUsuario(user.uid).subscribe((dadosUsuario) => {
          this.user = dadosUsuario;
          this.cdr.detectChanges();
        });
      } else {
        this.user = null;
        this.cdr.detectChanges();
      }
    });
  }

  async login() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.cdr.detectChanges();
      await this.tabsService.selectTab('tab1');
      await this.router.navigateByUrl('tabs/tab1');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      await this.showToast('warning', 2000, 'Email e/ou senha inválido(s)');
    }
  }


  async logout() {
    try {
      await this.authService.signOut();
      await this.cdr.detectChanges();
      this.user = '';
      await this.clearCache
      this.tabsService.selectTab('tab3');
      this.router.navigateByUrl('tabs/tab3').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

  async clearCache() {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
        console.log('Cache limpo com sucesso.');
      } else {
        console.warn('O navegador não suporta a API Cache Storage.');
      }
    } catch (error) {
      console.error('Erro ao limpar o cache:', error);
    }
  }

  //método de avisos
  async showToast(color: string, time: number, message: string) {
    await this.toastService.presentToast(color, time, message);
  }
}
