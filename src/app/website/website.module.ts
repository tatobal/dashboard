import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
  }
];


@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class WebsiteModule { }
