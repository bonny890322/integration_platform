import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menu!: MenuItem[];

  ngOnInit() {
    this.menu = [
      { label: 'Linki2', routerLink: 'linki2' },
      { label: 'DAQ', routerLink: 'daq' },
      { label: 'CSV', routerLink: 'csv' },
      { label: 'Model management', routerLink: 'model' }
    ];
  }
}
