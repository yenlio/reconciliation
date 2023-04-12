import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../data/service';
import { Validators } from '@angular/forms';
import { GenOTPResponse } from '../../../core/dto';
import { ForgotService } from '../../../data/service';
@Component({
  selector: 'app-change-password-first-login',
  templateUrl: './change-password-first-login.component.html',
  styleUrls: ['./change-password-first-login.component.scss'],
})
export class ChangePasswordFirstLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authRepositoryService: AuthenticationService,
    private forgotService: ForgotService
  ) {}
  @Input() username = '';
  @Input() email = '';
  @Input() transactionID = '';
  error = {
    errorMessage: '',
    errorCode: 0,
  };
  confirmCodeForm = new FormGroup({
    confirmCode: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  send() {
    const dataForm = this.confirmCodeForm.value;
    const payload = {
      functionType: 1,
      userName: this.username,
      transactionID: this.transactionID,
      email: this.email,
      otpCode: dataForm.confirmCode,
    };

    this.forgotService.confirmOTP(payload).subscribe((data: GenOTPResponse) => {
      if (data.errorCode == 0) {
        localStorage.setItem('transactionID', this.transactionID);
        localStorage.setItem('username', this.username);
        localStorage.setItem('email', this.email);
        this.router.navigateByUrl('/first-login/change-password');
      } else {
        this.error.errorCode = data.errorCode;
        switch (data.errorCode) {
          case 6:
            this.error.errorMessage = 'OTP không đúng';
            break;
          case 7:
            this.error.errorMessage = 'OTP hết hạn';
            break;
          default:
            this.error.errorMessage = 'Lỗi không xác định';
        }
      }
    });
  }

  resendOTP() {
    const obj = {
      functionType: 1,
      userName: this.username,
      transactionID: '',
      email: this.email,
    };

    this.forgotService.genOTP(obj).subscribe((data: GenOTPResponse) => {
      if (data.errorCode == 0) {
        alert('Chúng tôi đã gửi lại OTP. Vùi lòng kiểm tra hòm thư');
        this.transactionID = data.transactionID;
      } else {
        alert('Hệ thống gặp sự cố. Chúng tôi đang khắc phục.');
      }
    });
  }
}
