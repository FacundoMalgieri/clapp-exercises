import {Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {FormControl, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {environment} from '../../../environments/environment';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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

	/**
	 * Organizes the data after an event from child component.
	 *
	 * @param event
	 */
	productsModified(event) {
		this.organizeData('/products');
	}

	/**
	 * Sorts the products array by name or stock ASC or DESC.
	 *
	 * @param {string} by
	 */
	sortBy(by: string) {
		switch (by) {
			case 'name':
				this.products.sort(this.compareByName);
				break;
			case 'name-inv':
				this.products.sort(this.compareByNameInv);
				break;
			case 'stock':
				this.products.sort(this.compareByStockInv);
				break;
			case 'stock-inv':
				this.products.sort(this.compareByStock);
				break;
		}
	}

	/**
	 * Organize the data according to the current route. Empty the array, make the request and display the new array.
	 *
	 * @param {string} route
	 */
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

	/**
	 * Uses the sweet alert's confirmation alert to require confirmation for the delete operation.
	 * If it's confirmed it sends a delete request to de API and reloads the array's data.
	 *
	 * @param id the id of the about to delete product.
	 */
	deleteProduct(id) {
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

	/**
	 * Modifies the stock of the desired object, sends a put request to the API, reloads the data, displays an alert
	 * and resets the input value.
	 *
	 * @param {number} id the id of the product.
	 */
	updateStock(id: number) {
		this.ws.put(environment.baseUrl + '/' + id, {stock: this.stock.value}).subscribe(() => {
			this.organizeData('/products');
			this.swal.okAlert('Success', 'Stock modified', 'success');
			this.stock.reset();
		});
	}

	/**
	 * The following 4 functions are for sorting the array in different ways using an
	 * object's attributes for comparision.
	 *
	 * @param a
	 * @param b
	 * @returns {number}
	 */
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
}
