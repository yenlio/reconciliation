import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PermissionEntity } from '../../../core/entity';
import { BreadcrumbService, rolesService } from '../../../data/service';
import { ResponseGetFullRolesDto } from '../../../core/dto';
import { environment } from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './role-modal/modal.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Dialog } from '../../shared/dialog/dialog.component';
import { ConfirmDialog } from '../../shared/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  isAdmin = true;
  itemIdChoice: any;
  itemChoice: any;
  datasTable!: ResponseGetFullRolesDto[];
  showFilter = window.innerWidth <= 991 ? false : true;
  permission!: PermissionEntity[];
  isEdit: any = false;
  filter: any = {
    pageIndex: 1,
    pageSize: environment.pageSize,
  };

  pagination = {
    start: 1,
    end: environment.pageSize,
    page: 1,
    total: 0,
  };

  constructor(
    private rolesService: rolesService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.createBreadcrumbs(this.activatedRoute);
    this.rolesService.getPermission().subscribe((datas) => {
      this.permission = datas;
    });
    this.breakpointObserver
      .observe(['(min-width: 991px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showFilter = true;
        } else {
          this.showFilter = false;
        }
      });
    this.search();
  }

  search() {
    this.rolesService
      .getRole()
      .subscribe((datas: ResponseGetFullRolesDto[]) => {
        this.datasTable = datas;
        this.pagination.total = datas.length;
      });

    if (window.innerWidth <= 991) {
      this.showFilter = false;
    }
  }

  next() {
    if (this.pagination.end < this.pagination.total) {
      this.pagination.page += 1;
      this.filter.pageIndex = this.pagination.page;
    }
    // this.reCaculatorPagination();
    this.search();
  }

  prev() {
    if (this.pagination.start > 1) {
      this.pagination.page -= 1;
      this.filter.pageIndex = this.pagination.page;
    }
    // this.reCaculatorPagination();
    this.search();
  }

  // reCaculatorPagination() {
  //   this.pagination.start =
  //     (this.pagination.page - 1) * environment.pageSize + 1 >
  //     this.pagination.total
  //       ? this.pagination.total
  //       : (this.pagination.page - 1) * environment.pageSize + 1;
  //   this.pagination.end =
  //     this.pagination.start + environment.pageSize - 1 > this.pagination.total
  //       ? this.pagination.total
  //       : this.pagination.start + environment.pageSize - 1;
  // }

  clickRow(item: ResponseGetFullRolesDto) {
    if (item.id == this.itemIdChoice) {
      this.itemIdChoice = null;
    } else {
      this.itemIdChoice = item.id;
      this.itemChoice = item;
    }
  }

  checked(item: any, permission: any) {
    let result = false;
    item.forEach((e: any) => {
      if (e.name == permission.name) {
        result = true;
      }
    });
    return result;
  }
  newArr: any[] = [];

  logPermission(item: any, permission: any) {
    const obj = {
      action: '',
      roleID: item.id,
      resource: permission.name,
    };

    if (
      item.permission.filter((_item: any) => {
        return _item.name == permission.name;
      }).length > 0
    ) {
      item.permission = item.permission.filter((_item: any) => {
        return _item.name != permission.name;
      });
      obj.action = 'D';
    } else {
      item.permission.push(permission);
      obj.action = 'I';
    }
    this.newArr.push(obj);
    this.rolesService.addPermission(this.newArr).subscribe((data) => {});
  }

  deleteRole() {
    if (this.itemIdChoice) {
      const dialogRef = this.dialog.open(ConfirmDialog);
      const id = this.itemIdChoice;
      this.rolesService.getRoleByID(id).subscribe((data) => {
        const array = new Array({
          action: 'D',
          id: id,
          name: data.name,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result.event == 'confirm') {
            this.rolesService.deleteRole(array).subscribe((data) => {
              let message = '';
              this.translate.get('removeRoleError').subscribe((res: string) => {
                message = res;
              });
              if (data[0].errorCode === '99') {
                this.dialog.open(Dialog, {
                  data: {
                    message: message,
                  },
                });
              } else {
                this.search();
              }
              this.itemIdChoice = '';
            });
          }
        });
      });
    } else {
      this.alert();
    }
  }

  editForm(): void {
    this.isEdit = true;
    if (this.itemIdChoice) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          message: this.isEdit,
          permission: this.permission,
          id: this.itemIdChoice,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.search();
          this.itemIdChoice = null;
        }
      });
    } else {
      this.alert();
    }
  }

  addRole(): void {
    if (this.itemIdChoice) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          message: this.isEdit,
          permission: this.permission,
          id: this.itemIdChoice,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.search();
        }
      });
    } else {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          message: this.isEdit,
          permission: this.permission,
          id: '',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.search();
        }
      });
    }
  }

  alert() {
    let message = '';
    this.translate.get('pickRecord').subscribe((res: string) => {
      message = res;
    });
    this.dialog.open(Dialog, {
      data: {
        message: message,
      },
    });
  }
}
