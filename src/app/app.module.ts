import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminModule } from '../app/admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './admin/products/products.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// SERVICES
import { ConectionService } from './services/conection.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderAdminComponent
  ],
  imports: [
    AdminModule,
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [ConectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
