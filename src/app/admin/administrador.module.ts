import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginGuard } from '../guards/login.guard';



const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'admin/productos',
    component: ProductsComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [ProductsComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
  ]
})
export class AdministradorModule { }
