import {Component, OnInit} from '@angular/core';
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

  constructor(protected router: Router, protected ws: WebService, protected swal: AlertService) {
  }

  ngOnInit(): void {
    this.route = this.router.url;
    console.log(this.route);
    this.organizeData(this.route);
    this.query();
  }

  organizeData(route: string) {
    switch (route) {
      case '/products':
        this.ws.get(environment.baseUrl).subscribe((res) => this.products = res);
        break;
      case '/stock':
        this.ws.get(environment.baseUrl + route).subscribe((res) => this.products = res);
        break;
      case '/nostock':
        console.log('here');
        this.ws.get(environment.baseUrl + route).subscribe((res) => this.products = res);
        break;
    }
  }

  deleteCertification(id) {
    this.swal.confirmAlert({
      title: 'Are you sure?',
      text: 'This action is irreversible. Do you want to continue?',
      type: 'warning',
      confirmTitle: 'Success!',
      confirmText: 'Item has been deleted.'
    }, (res) => {
      if (res) {
        console.log(id)
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
}
