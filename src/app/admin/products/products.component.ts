import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { Products } from '../../models/products';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { faEdit, faTrash, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductsComponent implements OnInit {
  product = {} as Products;
  products: Products[];
  icons = { faEdit, faTrash, faBan };

  constructor(private conexion: ConectionService, config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    this.conexion.addProducts(this.product);
    this.product = {} as Products;
  }

  deleteProduct(product) {
    this.conexion.deleteProduct(product);
    this.modalService.dismissAll();
  }

  openQuestionDelete(questionDelete) {
    this.modalService.open(questionDelete, { centered: true });
  }
}
