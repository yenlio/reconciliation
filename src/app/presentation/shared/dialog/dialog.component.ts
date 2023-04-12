import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

export interface DialogData {
  message: '';
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class Dialog implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  closed(): void {
    this.dialogRef.close();
  }

  returnToLogin(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
}
