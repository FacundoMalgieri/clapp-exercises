import {Component, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {WebService} from '../../services/web.service';
import {environment} from '../../../environments/environment';

@Component({
	moduleId: module.id,
	templateUrl: 'add.component.html',
	styleUrls: ['add.component.css'],
	selector: 'add-comp'
})

export class AddComponent {
	@Output() productsModified = new EventEmitter<boolean>();

	form: FormGroup;
	formErrors = {'name': '', 'stock': ''};
	validations = {
		'name': {
			'required': 'Name is required.',
		},
		'stock': {
			'required': 'Stock is required.',
		}
	};

	constructor(private fb: FormBuilder, private ws: WebService, private router: Router, private swal: AlertService) {
		this.createForm();
	}

	createForm() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			stock: ['', Validators.required],
		});
		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

	/**
	 * This method waits for changes and adds the validation errors to every form control.
	 * @param data the event.
	 */
	onValueChanged(data?: any) {
		if (!this.form) {
			return;
		}
		for (const field in this.formErrors) {
			this.formErrors[field] = '';
			const control = this.form.get(field);
			if (control && control.dirty || !control.valid && control.touched && control.statusChanges) {
				const messages = this.validations[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	onSubmit() {
		this.ws.post(environment.baseUrl, this.form.value).subscribe(res => {
			this.swal.okAlert('Success', 'The product was added.', 'success');
			this.productsModified.emit(true);
		}, err => {
			this.swal.okAlert('Error', 'The product name already exists.', 'error');
		});
	}
}
