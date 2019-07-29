import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HeaderAdminComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdministradorModule { }
