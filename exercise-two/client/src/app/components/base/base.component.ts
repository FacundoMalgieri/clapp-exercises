import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {WebService} from '../../services/web.service';
import {Observable} from 'rxjs/Observable';

export abstract class BaseComponent {
	image;
	photos;
	url = 'getCertifications';

	protected constructor(protected router: Router, protected ws: WebService) {
	}

	protected getData() {
		this.ws.get(environment.baseUrl + this.url).subscribe(
			res => {
				this.photos = res;
			},
			error => {
				Observable.throw(error);
			},
			() => {
			}
		);
	}

	/**
	 * @param path the desired path
	 * @param param the param. For e.g. an ID
	 */
	navigateWithParam( param: string) {
		this.router.navigate([ environment.baseUrl + '/' + param]);
	}

	/**
	 * @param {string} location
	 */
	goTo(location: string): void {
		window.location.hash = location;
	}

	scrollTo(element): void {
		element.scrollIntoView({block: 'start', behavior: 'smooth'});
	}
}
