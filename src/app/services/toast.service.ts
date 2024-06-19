import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async presentToast(color: string, time: number, message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      position: 'top' ,
      color: color,
    });

    await toast.present();
  }
}
