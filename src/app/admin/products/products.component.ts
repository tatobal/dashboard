import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../services/conection.service';
import { Products } from '../../models/products';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  items: Products[];
  icons = { faCoffee };

  constructor(private conexion: ConectionService) {
  }

  ngOnInit() {
    this.conexion.getProducts().subscribe(data => {
      this.items = data;
    });
  }

}
