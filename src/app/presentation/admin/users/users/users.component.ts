import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roles, User } from '../../../../core/entity/index';
import { UserDto } from '../../../../core/dto/user.dto';
import { UserManagerService } from '../../../../data/service/user-manager.service';
import { BreadcrumbService } from '../../../../data/service';
import { environment } from '../../../../../environments/environment';
import { Dialog } from '../../../shared/dialog/dialog.component';
import { ConfirmDialog } from '../../../shared/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  itemChoice: any = false;
  showForm = false;
  userData!: User[];
  listRole!: Roles[];
  userForm!: User;
  errorForm: any = {};
  minDate = new Date(new Date().getFullYear() - 120, 0, 1);
  maxDate = new Date();
  yesterday: string = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  userSelect: any = [];

  filter: UserDto = {
    createDate: '',
    email: '',
    fullName: '',
    id: '',
    pageIndex: 1,
    pageSize: environment.pageSize,
    phone: '',
    username: '',
  };

  pagination = {
    start: 1,
    end: environment.pageSize,
    page: 1,
    total: 0,
  };

  dataItem: User = {
    createBy: '',
    createDate: '',
    email: '',
    fullName: '',
    id: 0,
    loginFailCount: 0,
    loginFreezeTime: '',
    modifyDate: '',
    password: '',
    passwordStatus: '0',
    phone: '',
    roles: [],
    userStatus: 1,
    username: '',
  };

  constructor(
    private UserManagerService: UserManagerService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.getRole();
    this.breadcrumbService.createBreadcrumbs(this.activatedRoute);
  }
  openFormAdd(username = '') {
    if (username) {
      this.UserManagerService.getByUserName(username).subscribe((res) => {
        this.dataItem = res;
        this.showForm = true;
      });
    } else {
      this.initUserData();
      this.showForm = true;
    }
  }
  initUserData() {
    this.dataItem = {
      createBy: '',
      createDate: '',
      email: '',
      fullName: '',
      id: 0,
      loginFailCount: 0,
      loginFreezeTime: '',
      modifyDate: '',
      password: '',
      passwordStatus: '0',
      phone: '',
      roles: [],
      userStatus: 1,
      username: '',
    };
  }
  getAllData() {
    this.filter.username = this.filter.username.replace(/\s/g, '');
    this.filter.email = this.filter.email.replace(/\s/g, '');
    this.filter.fullName = this.filter.fullName.trimStart();
    this.filter.phone = this.filter.phone.trimStart();
    this.UserManagerService.getAllUser(this.filter).subscribe((res) => {
      this.userData = res.datas;
      this.pagination.total = res.total ? res.total : 0;
      this.reCaculatorPagination();
    });
  }
  getRole() {
    this.UserManagerService.getRoles().subscribe((res) => {
      this.listRole = res.filter((item) => {
        delete item.permission;
        return true;
      });
    });
  }
  editUser(username: any) {
    this.UserManagerService.getByUserName(username).subscribe((res) => {
      this.dataItem = res;
    });
    this.showForm = true;
  }
  clickCheckBox(item: User) {
    if (item.userStatus == 0) {
      item.userStatus = 1;
    } else {
      item.userStatus = 0;
    }
    this.itemChoice =
      this.userData.filter((item: User) => {
        return item.userStatus == 0;
      }).length == 0
        ? false
        : true;
  }
  deleteUser() {
    const nameLogin = localStorage.getItem('username');
    const listChecked = this.userData.filter((item: User) => {
      return item.userStatus == 0;
    });
    const checkStatus =
      listChecked.filter((item: User) => {
        return item.username == nameLogin;
      }).length == 0
        ? true
        : false;
    if (listChecked.length !== 0 && checkStatus == true) {
      const dialogRef = this.dialog.open(ConfirmDialog);
      dialogRef.afterClosed().subscribe((result) => {
        if (result.event == 'confirm') {
          const usersDelete = listChecked;
          this.UserManagerService.deleteUser(usersDelete).subscribe((res) => {
            this.getAllData();
          });
        }
      });
    } else {
      if (listChecked.length == 0) {
        this.alert('pickRecord');
        return;
      } else if (checkStatus == false) {
        this.alert('deleteFalse');
        return;
      }
    }
  }

  next() {
    if (this.pagination.end < this.pagination.total) {
      this.pagination.page += 1;
      this.filter.pageIndex = this.pagination.page;
      this.reCaculatorPagination();
      this.getAllData();
    }
  }

  prev() {
    if (this.pagination.start > 1) {
      this.pagination.page -= 1;
      this.filter.pageIndex = this.pagination.page;
      this.reCaculatorPagination();
      this.getAllData();
    }
  }

  reCaculatorPagination() {
    this.pagination.start =
      (this.pagination.page - 1) * environment.pageSize + 1 >
      this.pagination.total
        ? this.pagination.total
        : (this.pagination.page - 1) * environment.pageSize + 1;
    this.pagination.end =
      this.pagination.start + environment.pageSize - 1 > this.pagination.total
        ? this.pagination.total
        : this.pagination.start + environment.pageSize - 1;
  }

  checkPhoneNumber() {
    if (!/^[0-9]*$/.test(this.filter.phone)) {
      this.errorForm.phone = 'Số điện thoại không đúng định dạng';
      return;
    }
    this.errorForm.phone = '';
    return;
  }

  alert(status: any) {
    let message = '';
    this.translate.get(status).subscribe((res: string) => {
      message = res;
    });
    this.dialog.open(Dialog, {
      data: {
        message: message,
      },
    });
  }
}
