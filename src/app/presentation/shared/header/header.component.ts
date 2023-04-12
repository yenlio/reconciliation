import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
// import { UsersService } from '../../../../services/users.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedValue!: string;
  @Input() infoUser: any;
  showNotifications = false;
  numbersNotifications = 1;
  username: any;
  statusShowFunction = false;
  date;
  month: any;
  year;
  lang: any;
  listNotification!: any[];

  languages = [
    {
      key: 'vi',
      name: 'Tiếng Việt',
    },
    {
      key: 'en',
      name: 'Tiếng Anh',
    },
  ];
  languageCurrent = {
    key: 'vi',
    name: 'Tiếng Việt',
  };
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

  ngOnInit(): void {
    this.username = localStorage.getItem('username')?.toUpperCase();
    this.lang = localStorage.getItem('lang' || 'en');
  }

  redirectAdmin() {
    this.router.navigateByUrl('admin');
    // this.BreadcrumbService.breadcrumbs = [];c
    // this.UsersService.menus.map(item => {
    //   item.show = false;
    //   item.childs.map((menu: any) => {
    //     menu.active = false;
    //   });

    // });
  }
  showBoxLanguage = false;
  switchLang(item: any) {
    // console.log(e.value, 'log');
    // localStorage.setItem('lang', e.value);
    // this.selectedValue = e.value;
    // // window.location.reload();
    // console.log(this.selectedValue, ' thí select');
    this.languageCurrent = item;
    this.showBoxLanguage = false;
    this.translateService.use(item.key);
  }

  // switchLang(e: any) {
  //   console.log(e.target.value,"log");
  //   localStorage.setItem("lang",e.target.value)
  //   window.location.reload()

  //   // this.translateService.use(lang);
  // }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('permission');
    localStorage.removeItem('username');
    localStorage.removeItem('cacheDate');
    this.router.navigateByUrl('/login');
  }
}
