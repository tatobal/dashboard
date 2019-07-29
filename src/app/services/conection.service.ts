import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  productsCollection: AngularFirestoreCollection<Products>;
  products: Observable<Products[]>;
  productsDoc: AngularFirestoreDocument<Products>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.productsCollection = this.db.collection('items');

    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Products;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getProducts() {
    return this.products;
  }

  addProducts(product: Products) {
    this.productsCollection.add(product);
  }

  deleteProduct(product: Products) {
    this.productsDoc = this.db.doc(`items/${product.id}`);
    this.productsDoc.delete();
  }

  login(email: string, password: string): any {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }
}
