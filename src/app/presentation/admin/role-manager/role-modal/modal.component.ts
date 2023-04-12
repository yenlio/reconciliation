import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PermissionEntity } from 'src/app/core/entity';
import { BreadcrumbService, rolesService } from '../../../../data/service';
import { ResponseGetFullRolesDto } from '../../../../core/dto/response-get-full-roles.dto';
import { Dialog } from '../../../shared/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isEdit = this.data.message;
  datasParent: any;
  roledata: PermissionEntity[] = [];
  rolePermissionList: any;
  roleForm!: FormGroup;
  nameData = '';
  permissionList: PermissionEntity[] = this.data.permission;
  ctrls: any;
  newArr: any = [];
  roleList!: ResponseGetFullRolesDto[];
  newRoleList!: ResponseGetFullRolesDto[];

  constructor(
    private rolesService: rolesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalComponent>,
    public translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id && this.isEdit) {
      this.rolesService
        .getRoleByID(this.data.id)
        .subscribe((data: ResponseGetFullRolesDto) => {
          this.datasParent = data;
          this.roledata = data.permission.map((item) => item);
          this.rolePermissionList = this.roledata.map((item: any) => item.name);
          this.roleForm = this.formBuilder.group({
            permissions: this.formBuilder.array(this.ctrls),
            name: data.name,
          });
          this.patchValue();
        });
    }
    console.log(this.permissionList);

    this.rolesService
      .getRole()
      .subscribe((datas: ResponseGetFullRolesDto[]) => {
        this.roleList = datas;
        if (datas && this.datasParent) {
          this.newRoleList = this.roleList.filter(
            (e) => e.name !== this.datasParent.name
          );
        }
      });

    this.ctrls = this.permissionList.map((control) =>
      this.formBuilder.control(false)
    );
    this.roleForm = this.formBuilder.group({
      permissions: this.formBuilder.array(this.ctrls),
      name: '',
    });
  }

  get permissionsArr() {
    return this.roleForm.get('permissions') as FormArray;
  }

  //Submit form
  submitEdit() {
    const name = this.roleForm.value.name.trim().toUpperCase();
    const obj = {
      action: 'I',
      id: this.data.id,
      name: name,
    };
    if (!name) {
      let message = '';
      this.translate.get('cannotBlank').subscribe((res: string) => {
        message = res;
      });
      this.dialog.open(Dialog, {
        data: {
          message: message,
        },
      });
    } else if (this.newRoleList.filter((e) => e.name === name).length > 0) {
      let message = '';
      this.translate.get('nameExist').subscribe((res: string) => {
        message = res;
      });
      this.dialog.open(Dialog, {
        data: {
          message: message,
        },
      });
    } else {
      const array = new Array(obj);
      this.rolesService.addRole(array).subscribe((data) => {
        this.rolesService.addPermission(this.newArr).subscribe((data) => {
          this.dialogRef.close({ event: 'submit' });
          let message = '';
          this.translate.get('editSuccess').subscribe((res: string) => {
            message = res;
          });
          this.dialog.open(Dialog, {
            data: {
              message: message,
              success: true,
            },
          });
        });
      });
    }
  }

  submitAdd() {
    const name = this.roleForm.value.name.trim().toUpperCase();
    if (!name) {
      let message = '';
      this.translate.get('cannotBlank').subscribe((res: string) => {
        message = res;
      });
      this.dialog.open(Dialog, {
        data: {
          message: message,
        },
      });
    } else if (this.roleList.filter((e) => e.name === name).length > 0) {
      let message = '';
      this.translate.get('nameExist').subscribe((res: string) => {
        message = res;
      });
      this.dialog.open(Dialog, {
        data: {
          message: message,
        },
      });
    } else {
      const obj = {
        action: 'I',
        id: this.data.id,
        name: name,
      };
      const array = new Array(obj);
      this.rolesService.addRole(array).subscribe((data) => {
        this.dialogRef.close({ event: 'submit' });
        let message = '';
        this.translate.get('addSuccess').subscribe((res: string) => {
          message = res;
        });
        this.dialog.open(Dialog, {
          data: {
            message: message,
            success: true,
          },
        });
      });
    }
  }

  checked(event: any, item: any) {
    this.datasParent.permission;
    let itemIndex = this.newArr.findIndex((x: any) => x.name === item.name);
    let obj = {
      action: '',
      roleID: this.data.id,
      resource: item.name,
    };
    if (event.target.checked) {
      obj.action = 'I';
      if (itemIndex >= 0) {
        this.newArr[itemIndex] = obj;
      } else {
        this.newArr.push(obj);
      }
    } else {
      obj.action = 'D';
      if (itemIndex >= 0) {
        this.newArr[itemIndex] = obj;
      } else {
        this.newArr.push(obj);
      }
    }
  }

  // getRoleByID(id: any) {
  //   this.rolesService
  //     .getRoleByID(id)
  //     .subscribe((data: ResponseGetFullRolesDto) => {
  //       this.datasParent = data;
  //       this.roledata = data.permission.map((item) => item);
  //       this.rolePermissionList = this.roledata.map((item: any) => item.name);
  //       console.log(this.datasParent);
  //       this.roleForm = this.formBuilder.group({
  //         permissions: this.formBuilder.array(this.ctrls),
  //         name: data.name,
  //       });

  //       this.patchValue();
  //     });
  // }

  // addPermission(filter: any) {
  //   this.rolesService.addPermission(filter).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  patchValue() {
    this.permissionList.map((perm: any, i) => {
      if (this.rolePermissionList.indexOf(perm.name) !== -1) {
        this.permissionsArr.at(i).patchValue(true);
      }
    });
  }

  closed(e: any): void {
    e.preventDefault();
    this.dialogRef.close();
  }
}
