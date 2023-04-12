import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
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
import { ErrorEntity } from 'src/app/core/entity';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from '../../../shared/forgot-password-notification/notification.component';

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
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
})
export class ConfirmOtpComponent implements OnInit {
  constructor(
    private forgotService: ForgotService,
    private router: Router,
    private dialog: MatDialog,
    private authRepositoryService: AuthenticationService
  ) {}
  countDown!: Subscription;
  @Input() username: any;
  @Input() email: any;
  @Input() transactionID: any;
  otpCode = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('permission');
  }
  error = new ErrorEntity(0, '');
  matcher = new MyErrorStateMatcher();
  hideSendButton = true;
  show = false;
  showForm = false;
  showtime = false;
  countResend: any = 0;
  countWrongOtp: any = 5;

  submitOtp() {
    const obj = {
      functionType: 1,
      userName: this.username,
      transactionID: this.transactionID,
      email: this.email,
      otpCode: this.otpCode.value,
    };
    if (this.otpCode.value) {
      this.forgotService.confirmOTP(obj).subscribe((data: GenOTPResponse) => {
        if (data.errorCode == 0) {
          localStorage.setItem('transactionID', data.transactionID);
          if (this.email && this.username) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('email', this.email);
          }
          this.router.navigateByUrl('/forgot-password/change-password');
        } else if (data.errorCode == 7) {
          this.dialog.open(Notification, {
            data: {
              missOTP: true,
            },
          });
        } else {
          if (this.countWrongOtp > 0) {
            --this.countWrongOtp;
            this.dialog.open(Notification, {
              data: {
                wrongOTP: true,
                countWrongOtp: this.countWrongOtp,
              },
            });
          } else {
            this.dialog.open(Notification, {
              data: {
                wrongOTP: true,
                countWrongOtp: this.countWrongOtp,
              },
            });
          }
        }
      });
    }
  }

  forgot() {
    const obj: PayLoadForgotPassword = {
      functionType: 1,
      userName: this.username,
      transactionID: '',
      email: this.email,
    };
    if (this.username.value && this.email.value) {
      this.forgotService.genOTP(obj).subscribe((data: GenOTPResponse) => {
        if (data.errorCode == 0) {
          this.transactionID = data.transactionID;
        } else {
          this.error.errorCode = data.errorCode;
          this.error.errorMessage = data.errorMessage;
        }
      });
    }
  }

  change() {
    this.error.errorCode = 0;
  }

  resend() {
    if (this.countResend > 5) {
      this.dialog.open(Notification, {
        data: {
          countResend: true,
        },
      });
    } else {
      this.forgot();
      ++this.countResend;
      this.showtime = true;
      this.counter = 10;
      this.tick = 1000;
      this.resendTime();
    }
  }
  counter = 10;
  tick = 1000;
  resendTime() {
    this.countDown = timer(0, this.tick).subscribe((count) => {
      if (this.counter == 0 && count) {
        if (this.countDown) {
          this.showtime = false;
          this.countDown.unsubscribe();
        }
      } else {
        --this.counter;
      }
    });
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
