import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {AlertService} from '../../services/alert.service';
import {environment} from '../../../environments/environment';
import {FormControl, Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css'],
  selector: 'product-comp'
})

export class ProductsComponent implements OnInit {
  route: any;
  products;
  search: FormControl = new FormControl('', Validators.required);
  stock: FormControl = new FormControl('', Validators.required);

  constructor(protected router: Router, protected ws: WebService, protected swal: AlertService) {
  }

  ngOnInit(): void {
    this.route = this.router.url;
    this.organizeData(this.route);
    this.query();
  }

  productsModified(event) {
    console.log(event)
    this.organizeData('/products');
  }

  sortBy(by: string) {
    if (by === 'name') this.products.sort(this.compareByName);
    else if (by === 'name-inv') this.products.sort(this.compareByNameInv);
    else if (by === 'stock') this.products.sort(this.compareByStock);
    else if (by === 'stock-inv') this.products.sort(this.compareByStockInv);
  }

  compareByName(a, b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  compareByNameInv(a, b) {
    if (a.name < b.name)
      return 1;
    if (a.name > b.name)
      return -1;
    return 0;
  }

  compareByStock(a, b) {
    if (a.stock < b.stock)
      return -1;
    if (a.stock > b.stock)
      return 1;
    return 0;
  }

  compareByStockInv(a, b) {
    if (a.stock < b.stock)
      return 1;
    if (a.stock > b.stock)
      return -1;
    return 0;
  }


  organizeData(route: string) {
    switch (route) {
      case '/products':
        this.products = [];
        this.ws.get(environment.baseUrl).subscribe((res) => this.products = res);
        break;
      case '/stock':
        this.products = [];
        this.ws.get(environment.baseUrl + route).subscribe((res) => this.products = res);
        break;
      case '/nostock':
        this.products = [];
        this.ws.get(environment.baseUrl + route).subscribe((res) => this.products = res);
        break;
    }
  }

  deleteProduct(id) {
    let that = this;
    this.swal.confirmAlert({
      title: 'Are you sure?',
      text: 'This action is irreversible. Do you want to continue?',
      type: 'warning',
      confirmTitle: 'Success!',
      confirmText: 'Item has been deleted.'
    }, (res) => {
      if (res) {
        this.ws.delete(environment.baseUrl + '/' + id);
        this.organizeData('/products');
      }
    });
  }

  /**
   * Subscribes to the search input to make queries to the API.
   */
  private query(): void {
    this.search.valueChanges.subscribe(search => {
      this.ws.get(environment.baseUrl + '/' + search).subscribe((res) => this.products = res);
    });
  }

  updateStock(id: number) {
    this.ws.put(environment.baseUrl + '/' + id, {stock: this.stock.value}).subscribe(res => {
      this.organizeData('/products');
      this.swal.okAlert('Success','Stock modified', 'success');
      this.stock.reset();
    });
  }
}
