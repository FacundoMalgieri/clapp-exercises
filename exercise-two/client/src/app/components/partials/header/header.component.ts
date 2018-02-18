import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {$} from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  constructor(protected router: Router) {
  }
  /**
   * @param path the desired path
   */
  navigate(path: string): void {
    this.router.navigate(['/' + path]);
  }
}
