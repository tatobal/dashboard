import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  items: Observable<Products[]>;
  itemsCollection: any;

  constructor(private db: AngularFirestore) {
    this.items = this.db.collection('items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Products;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getProducts() {
    return this.items;
  }
}
