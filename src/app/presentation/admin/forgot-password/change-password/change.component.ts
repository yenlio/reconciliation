import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../data/service';
import { GenOTPResponse, PayLoadForgotPassword } from '../../../../core/dto';
import { ErrorStateMatcher } from '@angular/material/core';
import { ForgotService } from '../../../../data/service';
import { animate, style, transition, trigger } from '@angular/animations';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  constructor(
    private forgotService: ForgotService,
    private router: Router,
    private authRepositoryService: AuthenticationService
  ) {}
  @HostListener('window:beforeunload') refresh() {
    localStorage.clear();
  }
  error = {
    code: '',
    message: '',
  };
  transactionID: any;
  username: any;
  email: any;
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  repassword = new FormControl('', [Validators.required, Validators.min(6)]);
  captchaCode = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    if (
      localStorage.getItem('username') &&
      localStorage.getItem('transactionID') &&
      localStorage.getItem('email')
    ) {
      this.username = localStorage.getItem('username');
      this.transactionID = localStorage.getItem('transactionID');
      this.email = localStorage.getItem('email');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  matcher = new MyErrorStateMatcher();
  notMatch = false;
  tooShort = false;
  changePassword(event: any) {
    if (this.password.value) {
      if (this.password.value?.length < 6) {
        this.tooShort = true;
        return;
      }
    }
    if (this.repassword.value !== this.password.value) {
      this.notMatch = true;
      return;
    }

    const obj = {
      password: this.password.value,
      email: this.email,
      transactionID: this.transactionID,
      userName: this.username,
    };
    this.forgotService.createPassword(obj).subscribe((data: GenOTPResponse) => {
      if (data.errorCode == 0) {
        localStorage.removeItem('username');
        localStorage.removeItem('transactionID');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/login');
      } else {
        alert(
          'Lỗi hệ thống. Chúng tôi đang cố gắng khắc phục. Vui lòng thử lại sau!'
        );
      }
    });
  }

  change() {
    this.notMatch = false;
    this.tooShort = false;
  }
}
