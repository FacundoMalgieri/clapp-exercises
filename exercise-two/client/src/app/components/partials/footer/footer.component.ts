import {AfterViewInit, Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
	moduleId: module.id,
	selector: 'footer-comp',
	templateUrl: 'footer.component.html',
	styleUrls: ['footer.component.css']
})
export class FooterComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		/**
		 * Go top scroll behaviour.
		 */
		$(() => {
			$(document).delegate('.top', 'click', (function () {
				let target = $(this.hash);
				target = target.length ? target : $('[id=header]');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - 1600)
					}, 1500);
					return false;
				}
				event.stopPropagation();
			}));
		});
	}
}
