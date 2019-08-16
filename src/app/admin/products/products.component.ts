import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectionService } from '../../services/conection.service';
import { LoginService } from '../../services/login.service';
import { Products } from '../../models/products';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductsComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  p = 1;
  product = {} as Products;
  editProduct = {} as Products;
  products: Products[];
  alert: boolean;
  message: string;
  icons = { faEdit, faTrash, faBan, faPlusCircle };
  categorias = ['Tecnología', 'Comida', 'Hogar'];
  estados = [{nombre: 'Habilitado', status: true}, {nombre: 'Desabilitado', status: false}];
  ofertas = [{nombre: 'Si', status: true}, {nombre: 'No', status: false}];

  constructor(
    private conexion: ConectionService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private login: LoginService,
    private router: Router,
    private storage: AngularFireStorage) {
    this.alert = false;
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  uploadFile(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    console.log('archivo: ', file);
    console.log('nombre: ', id);
    const filePath = `uploads/item_${id}`;
    const fileRef = this.storage.ref(filePath);
    console.log('paso el ref');
    const task = this.storage.upload(filePath, file);
    console.log('paso el task');

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe();
  }

  addProduct() {
    this.conexion.addProducts(this.product);
    this.product = {} as Products;
    this.alert = true;
    this.message = `<strong>Agregado exitosamente</strong>`;
    setTimeout(() => {
      this.alert = false;
    }, 2000);

  }

  deleteProduct(product) {
    this.conexion.deleteProduct(product);
    this.modalService.dismissAll();
    this.alert = true;
    this.message = `<strong>Eliminado</strong> exitosamente`;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
  }

  updateProduct(product) {
    this.editProduct = product;
    this.conexion.updateProducts(this.editProduct);
    this.modalService.dismissAll();
    this.alert = true;
    this.message = `<strong>Editado</strong> exitosamente`;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
  }

  openQuestionDelete(questionDelete) {
    this.modalService.open(questionDelete, { centered: true });
  }

  detailProduct(detailProductModal, product) {
    this.modalService.open(detailProductModal, { centered: true, size: 'lg' });
    this.editProduct = product;
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/admin']);
  }
}
