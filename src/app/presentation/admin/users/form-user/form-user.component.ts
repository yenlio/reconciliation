import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User, Roles } from '../../../../core/entity';
import { UserManagerService } from '../../../../data/service/user-manager.service';
import { Dialog } from '../../../shared/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import {Role} from "../../../../core/dto/role.dto"
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit, OnChanges {
  result: any;
  isAdmin: any;
  formValue!: FormGroup;
  userGroups: any;
  roles: any[] = [];
  createTime!: string;
  changePassword = false;
  rolesChecked: any = [];
  isActive: any;
  errorForm: any = {};
  minDate = new Date(new Date().getFullYear() - 120, 0, 1);
  maxDate = new Date();
  yesterday: string = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  dataPassAPI: any = {
    id: '',
    createBy: '',
    createDate: '',
    email: '',
    fullName: '',
    isActive: 0,
    loginFailCount: 0,
    loginFreezeTime: '',
    modifyDate: '',
    password: '',
    passwordStatus: '0',
    phone: '',
    roles: [
      {
        id: 0,
        name: '',
      },
    ],
    userStatus: 0,
    username: '',
  };
  @Input() userData!: User[];
  @Input() dataItem!: User;
  @Input() data: any = {};
  @Input() showForm = false;
  @Output() getAllData = new EventEmitter<any>();
  @Input() listRole!: Roles[];
  @Output() passData = new EventEmitter<any>();
  @Output() passDataUpdate = new EventEmitter<any>();
  @Output() showFormChange = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();
  constructor(
    private UserManagerService: UserManagerService,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    const roleBrowrer = JSON.parse(localStorage.getItem('roles')!);
    const usernameBrower = localStorage.getItem('username');
    if (this.dataItem.id) {
      const result_brower = roleBrowrer.filter((item: any) => {
        return item ==Role.ADMIN;
      });
      if (
        result_brower.length !== 0 && this.dataItem.username == usernameBrower
      ) {
        if (result_brower[0] == Role.ADMIN) {
          this.isAdmin = Role.ADMIN;
        }
      }
    }
  }
  ngOnChanges() {
    this.rolesChecked = this.dataItem.roles;
  }
  userForm = new FormGroup({
    id: new FormControl(0),
    fullName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    userStatus: new FormControl(0),
    createBy: new FormControl(''),
  });

  checkedRole(option: any) {
    return this.rolesChecked.filter((item: any) => {
      return item.id == option.id;
    }).length == 0
      ? false
      : true;
  }

  change(event: any, option: any) {
    if (event.target.checked) {
      if (
        this.rolesChecked.filter((item: any) => {
          return item.id == option.id;
        }).length == 0
      ) {
        this.rolesChecked.push(option);
      }
    } else {
      this.rolesChecked = this.rolesChecked.filter((item: any) => {
        return item.id != option.id;
      });
      this.dataItem.roles = this.rolesChecked;
      this.checkedRole(this.rolesChecked);
    }
  }

  checkFullname() {
    this.dataItem.fullName = this.dataItem.fullName.trimStart();
    if (!this.userForm.value.fullName) {
      this.errorForm.fullName = 'Họ và tên không được bỏ trống';
      return;
    }
    this.errorForm.fullName = '';
    return;
  }

  checkPhone() {
    this.dataItem.phone = this.dataItem.phone.trimStart();
    if (!this.dataItem.phone) {
      this.errorForm.phone = 'Số điện thoại không được bỏ trống';
      return;
    }

    if (!/^[0-9]*$/.test(this.dataItem.phone)) {
      this.errorForm.phone = 'Số điện thoại không đúng định dạng';
      return;
    }
    if (this.dataItem.phone.length > 10) {
      this.errorForm.phone = 'Số điện thoại không vượt quá 10 số';
      return;
    }
    this.errorForm.phone = '';
    return;
  }

  checkEmail() {
    this.dataItem.email = this.dataItem.email.trimStart();
    if (!this.dataItem.email) {
      this.errorForm.email = 'Email không được bỏ trống.';
      return;
    }
    if (this.dataItem.email) {
      if (this.dataItem.email.length > 30) {
        this.errorForm.email = 'Độ dài email không vượt quá 30 ký tự.';
        return;
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.dataItem.email
        )
      ) {
        this.errorForm.email = 'Email không đúng định dạng.';
        return;
      }
    }
    this.errorForm.email = '';
    return;
  }

  checkUsername() {
    this.dataItem.username = this.dataItem.username.trimStart();
    if (!this.dataItem.username) {
      this.errorForm.username = 'Tên đăng nhập không được bỏ trống';
      return;
    }
    if (this.dataItem.username) {
      if (
        !/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
          this.dataItem.username
        )
      ) {
        this.errorForm.username = 'User name không đúng định dạng';
        return;
      }
    }
    this.errorForm.username = '';
    return;
  }

  async checkUsernameDuplicate() {
    this.checkUsername();
    if (!this.dataItem.id && this.dataItem.username) {
      const dataCheck = await this.UserManagerService.validateUserPromise(
        this.dataItem
      );
      if (dataCheck.errorDetails == 'User already exist') {
        this.errorForm.username = 'tên đăng nhập đã tồn tại';
        return;
      } else {
        this.errorForm.username = '';
      }
    }
  }

  checkEmailDuplicate() {
    this.checkEmail();
    if (!this.dataItem.id) {
      this.UserManagerService.validateUser(this.dataItem).subscribe((res) => {
        if (res.errorDetails == 'Email already exist') {
          this.errorForm.email = 'email đã tồn tại';
          return;
        }
      });
    }
  }

  checkPassword() {
    if (!this.dataItem.id) {
      if (!this.dataItem.password) {
        this.errorForm.password = 'Mật khẩu không được bỏ trống';
        return;
      }
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,12}$/.test(
          this.dataItem.password
        )
      ) {
        this.errorForm.password = 'Mật khẩu không đúng định dạng';
        return;
      }
      this.errorForm.password = '';
      return;
    }
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

  async save(close = false) {
    this.checkPassword();
    await this.checkUsernameDuplicate();
    this.checkEmail();
    this.checkPhone();
    this.checkFullname();
    for (const key of Object.keys(this.errorForm)) {
      if (this.errorForm[key]) {
        return;
      }
    }
    if (!this.dataItem.id) {
      delete this.dataItem.id;
      this.dataItem.createDate = Math.ceil(
        new Date().getTime() / 1000
      ).toString();
    } else {
      delete this.dataItem.password;
      this.dataItem.modifyDate = Math.ceil(
        new Date().getTime() / 1000
      ).toString();
    }
    this.UserManagerService.saveUser([this.dataItem]).subscribe((res: any) => {
      if (!this.dataItem.id) {
        res.filter((item: any) => {
          if (item.errorCode !== '0') {
            this.alert('addError');
          } else {
            this.alert('addUserSuccess');
          }
        });
      } else {
        res.filter((item: any) => {
          if (item.errorCode !== '0') {
            this.alert('updateError');
          } else {
            this.alert('updateSuccess');
          }
        });
      }
      this.getAllData.emit();
      this.showForm = false;
      this.showFormChange.emit(this.showForm);
    });
  }
  closeForm() {
    this.showForm = false;
    this.showFormChange.emit(this.showForm);
    this.search.emit();
  }
}
