import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioCrudService {
  constructor(private firestore: AngularFirestore) {}

  // Create
  adicionarUsuario(uid: string, dadosUsuario: any): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).set(dadosUsuario);
  }

  //  READ
  obterUsuario(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  //  Update
  atualizarUsuario(uid: string, novosDados: any): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).update(novosDados);
  }

  //  Delete
  // removerUsuario(uid: string): Promise<void> {
  //   return this.firestore.collection('usuarios').doc(uid).delete();
  // }
}
