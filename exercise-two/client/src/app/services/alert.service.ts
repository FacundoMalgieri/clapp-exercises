import {Injectable} from '@angular/core';

declare const swal: any;

@Injectable()
export class AlertService {
	constructor() {
	}

	/**
	 * This is a generic ok alert.
	 * @param object the object with properties to be displayed.
	 *
	 * For e.g. To generate an warning for example pass 'warning' in type attribute.
	 */
	okAlert(object: any) {
		swal({
			title: object.title,
			text: object.text,
			type: object.type,
			showCancelButton: false,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'OK',
		});
	}

	/**
	 * This is a generic confirmation alert.
	 * @param object the object with properties to be displayed.
	 * @param callback
	 * @return {boolean} if cancelled, true, else false.
	 *
	 * For e.g. To generate an warning for example pass 'warning' in type attribute.
	 */
	confirmAlert(object: any, callback: Function): any {
		swal({
			title: object.title,
			text: object.text,
			type: object.type,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'OK'
		}).then(res => {
			swal({
				title: object.confirmTitle,
				text: object.confirmText,
				type: 'success'
			});
			return callback(true);
		}, cancel => {
			swal({
				title: 'Cancelled',
				text: 'Action cancelled',
				type: 'error'
			});
			return callback(null);
		});
	}
}
