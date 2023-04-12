import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from '../../../data/service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  version = '';

  constructor(public breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.version = `Ver ${environment.version}`;
  }

  showMenuChilds(item: any) {
    item.show = !item.show;
  }

  checkInfoUser() {}
}
