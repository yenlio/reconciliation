import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../data/service';
import { GenOTPResponse, PayLoadForgotPassword } from '../../../core/dto';
import { ErrorStateMatcher } from '@angular/material/core';
import { ForgotService } from '../../../data/service';
import { ErrorEntity } from 'src/app/core/entity';
import { Subscription, timer } from 'rxjs';
import { Dialog } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from '../../shared/forgot-password-notification/notification.component';

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
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  constructor(
    private forgotService: ForgotService,
    private router: Router,
    private dialog: MatDialog,
    private authRepositoryService: AuthenticationService
  ) {}
  countDown!: Subscription;

  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  otpCode = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('permission');
  }
  error = new ErrorEntity(0, '');
  matcher = new MyErrorStateMatcher();
  transactionID: any;
  countResend: any = 6;
  countWrongOtp: any = 5;
  statusConfirmOtp = false;
  forgot(event: any) {
    // this.router.navigateByUrl('forgot-password/change-password');

    const obj: PayLoadForgotPassword = {
      functionType: 1,
      userName: this.username.value,
      transactionID: '',
      email: this.email.value,
    };
    if (this.username.value && this.email.value) {
      // event.preventDefault();
      // this.hideSendButton = false;
      // this.showForm = true;
      // this.showtime = true;
      // this.statusConfirmOtp = true;
      this.forgotService.genOTP(obj).subscribe((data: GenOTPResponse) => {
        if (data.errorCode == 0) {
          this.transactionID = data.transactionID;
          this.statusConfirmOtp = true;
        } else {
          this.error.errorCode = data.errorCode;
          this.error.errorMessage = data.errorMessage;
        }
      });
    }

    // if (this.email.value) {
    //
  }

  submitOtp() {
    const obj = {
      functionType: 1,
      userName: this.username.value,
      transactionID: this.transactionID,
      email: this.email.value,
      otpCode: this.otpCode.value,
    };
    if (this.otpCode.value) {
      this.forgotService.confirmOTP(obj).subscribe((data: GenOTPResponse) => {
        if (data.errorCode == 0) {
          localStorage.setItem('transactionID', data.transactionID);
          if (this.email.value && this.username.value) {
            localStorage.setItem('username', this.username.value);
            localStorage.setItem('email', this.email.value);
          }

          this.router.navigateByUrl('/forgot-password/change-password');
        }
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
      });
    }
  }

  change() {
    this.error.errorCode = 0;
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
