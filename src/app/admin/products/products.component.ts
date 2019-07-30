import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
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

  constructor(private conexion: ConectionService, config: NgbModalConfig, private modalService: NgbModal) {
    this.alert = false;
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.products = data;
    });
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
    this.modalService.open(detailProductModal, { centered: true });
    this.editProduct = product;
  }

/*   editingProduct() {
    this.conexion.addProducts(this.editProduct);
    this.product = {} as Products;
  } */
}
