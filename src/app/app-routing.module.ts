import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './admin/products/products.component';
import { HeaderAdminComponent } from '../app/admin/header-admin/header-admin.component';
import { LoginComponent } from './admin/login/login.component';


const routes: Routes = [
{path: 'admin', component: LoginComponent},
{path: 'admin/products', component: ProductsComponent},
{path: 'head', component: HeaderAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
