import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { Products } from '../../models/products';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product = {} as Products;
  products: Products[];
  icons = { faEdit, faTrash };

  constructor(private conexion: ConectionService) {
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
  }

}
