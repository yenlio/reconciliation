import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  @Input() infoUser: any;
  showNotifications = false;
  numbersNotifications = 1;

  statusShowFunction = false;
  date;
  month: any;
  year;
  listNotification!: any[];
  constructor(
    private router: Router,
    private translateService: TranslateService // private BreadcrumbService: // BreadcrumbService, // private UsersService: UsersService
  ) {
    const date = new Date();
    this.date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.month = date.getMonth() + 1;
    this.month = this.month < 10 ? '0' + this.month : this.month;
    this.year = date.getFullYear();
  }

  ngOnInit(): void {}

  redirectAdmin() {
    this.router.navigateByUrl('admin');
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }

  reload() {
    this.router.navigateByUrl('/');
  }
}
