import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: any = [];
  menusOrigin = [
    {
      name: 'GIAO DỊCH',
      icon: '/assets/images/ic-transaction.png',
      show: false,
      childs: [
        {
          name: 'Đối soát giao dịch',
          code: 'rc-View-Summary',
          link: '/admin/transaction/reconciliation',
          active: false,
          title: 'Đối soát giao dịch',
        },
        {
          name: 'Trạng thái xử lý',
          code: 'rc-Create-Reconciliation',
          link: '/admin/handle-transaction',
          active: false,
          title: 'Xử lý giao dịch',
        },
      ],
    },
    {
      name: 'NGƯỜI DÙNG',
      icon: '/assets/images/ic-user.png',
      show: false,
      childs: [
        {
          name: 'Người dùng',
          code: 'mngt-User',
          link: '/admin/users',
          active: false,
          title: 'Người dùng',
        },
        {
          name: 'Nhóm người dùng',
          code: 'user-groups',
          link: '/admin/user-groups',
          active: false,
          title: 'Nhóm người dùng',
        },
        {
          name: 'Tập quyền',
          code: 'mngt-Role',
          link: '/admin/rights-groups',
          active: false,
          title: 'Quản lý phân quyền',
          table: 'rights-group',
        },
      ],
    },
    {
      name: 'Quản trị hệ thống',
      icon: '/assets/images/ic-setting.png',
      show: false,
      childs: [
        {
          name: 'Đối tác',
          code: 'screen',
          link: '/admin/settings/screens',
          active: false,
          title: 'Đối tác',
        },
        {
          name: 'Thiết lập đối soát',
          code: 'setting-dashboard',
          link: '/admin/settings/dashboards',
          active: false,
          title: 'Thiết lập đối soát',
        },
        {
          name: 'Thiết lập luồng giao dịch',
          code: 'setting-dashboard',
          link: '/admin/settings/dashboards',
          active: false,
          title: 'Thiết lập luồng giao dịch',
        },
      ],
    },
  ];

  menus: any[] = [];
  permission = JSON.parse(localStorage['permission']);
  menusNew: any = [];
  processMenuForRole() {
    this.permission = JSON.parse(localStorage['permission']);
    let menusOrigin = JSON.parse(JSON.stringify(this.menusOrigin));
    this.menusNew = menusOrigin.map((item: any) => {
      item.childs = item.childs.filter((code: any) =>
        this.permission.includes(code.code)
      );
      return item;
    });

    this.menus = this.menusNew.filter((item: any) => item.childs.length != 0);
  }
  constructor(private title: Title) {}

  createBreadcrumbs(activatedRoute: any) {
    this.processMenuForRole();
    this.breadcrumbs = [];
    const path = activatedRoute.snapshot._routerState.url;

    this.menus.map((item) => {
      let flag = false;
      item.childs.map((menu: any) => {
        if (
          path.includes(menu.link) &&
          (path.replace(menu.link, '') == '' ||
            path.replace(menu.link, '').slice(0, 1).includes('/'))
        ) {
          menu.active = true;
          flag = true;
          // this.breadcrumbs.push({ name: item.name, link: '#' });
          // this.breadcrumbs.push({ name: menu.name, link: menu.link });
          // let title = menu.title;

          // this.breadcrumbs = this.breadcrumbs.concat(breadcrumbsAdd);
          // title += " - " + "Hệ thống Phòng chống rửa tiền";
          // this.Title.setTitle(title)
        } else {
          menu.active = false;
        }
      });

      if (flag) {
        item.show = flag;
      }
    });
  }
}
