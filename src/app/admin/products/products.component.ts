import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectionService } from '../../services/conection.service';
import { LoginService } from '../../services/login.service';
import { Products } from '../../models/products';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductsComponent implements OnInit {
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
    private router: Router) {
    this.alert = false;
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    console.log('Producto: ', this.product);
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
