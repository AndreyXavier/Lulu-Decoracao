import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuadroCrudService {

  constructor(private firestore: AngularFirestore) { }

  // READ
  obterQuadros(): Observable<any[]> {
    return this.firestore.collection('quadros').valueChanges({ idField: 'uid' });
  }
}
