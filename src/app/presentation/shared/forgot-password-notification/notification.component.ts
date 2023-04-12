import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-noti',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class Notification implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<Notification>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data.countResend || this.data.countWrongOtp == 0) {
      this.resendTime();
    }
  }

  closed(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close();
  }

  returnToLogin(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
  countDown!: Subscription;
  counter = 6;
  tick = 1000;
  resendTime() {
    this.countDown = timer(0, this.tick).subscribe((count) => {
      if (this.counter == 0 && count) {
        if (this.countDown) {
          this.countDown.unsubscribe();
        }
        this.dialogRef.close();
        this.router.navigateByUrl('/login');
      } else {
        --this.counter;
      }
    });
  }
}

// @Pipe({
//   name: 'formatTime',
// })
// export class FormatTimePipe implements PipeTransform {
//   transform(value: number): string {
//     const minutes: number = Math.floor(value / 60);
//     return (
//       ('00' + minutes).slice(-2) +
//       ':' +
//       ('00' + Math.floor(value - minutes * 60)).slice(-2)
//     );
//   }
// }
