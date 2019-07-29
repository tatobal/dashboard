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
  editProduct;
  products: Products[];
  newProduct: boolean;
  deletePro: boolean;
  icons = { faEdit, faTrash, faBan, faPlusCircle };

  constructor(private conexion: ConectionService, config: NgbModalConfig, private modalService: NgbModal) {
    this.newProduct = false;
    this.deletePro = false;
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    this.conexion.addProducts(this.product);
    this.product = {} as Products;
    this.newProduct = true;
    setTimeout(() => {
      this.newProduct = false;
    }, 2000);
  }

  deleteProduct(product) {
    this.conexion.deleteProduct(product);
    this.modalService.dismissAll();
    this.deletePro = true;
    setTimeout(() => {
      this.deletePro = false;
    }, 2000);

  }

  openQuestionDelete(questionDelete) {
    this.modalService.open(questionDelete, { centered: true });
  }

  detailProduct(detailProductModal) {
    this.modalService.open(detailProductModal, { centered: true });
  }

  editingProduct() {
    this.conexion.addProducts(this.editProduct);
    this.product = {} as Products;
  }
}
