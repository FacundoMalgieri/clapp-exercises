import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/partials/header/header.component';
import {FooterComponent} from './components/partials/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from './services/alert.service';
import {WebService} from './services/web.service';
import {ProductsComponent} from './components/products/products.component';
import {AddComponent} from './components/add/add.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AppComponent,
    AddComponent,
    ProductsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutes
  ],
  providers: [
    AlertService,
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
