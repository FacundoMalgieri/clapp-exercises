import {AfterViewInit, Component, OnInit} from '@angular/core';
import $ from 'jquery';

import {Router} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	route: any;
	bg: any;

	constructor(protected router: Router) {
	}

	ngOnInit(): void {
		this.urlPromise();
	}

	urlPromise() {
		this.router.events.subscribe((val) => {
			this.route = this.router.url;
			this.headerTextChanger(this.route);
		});
	}

	headerTextChanger(route: string) {
		switch (route) {
			case '/contact':
				this.bg = 'bg-blue';
				break;
			case '/login':
				this.bg = 'bg-blue';
				break;
			case '/admin/':
			case '/admin/dashboard':
				this.bg = 'bg-black';
				break;
		}
	}
}
