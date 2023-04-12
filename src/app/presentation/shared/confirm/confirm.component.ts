import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  message: string = 'Bạn chắc chắn muốn xoá!';

  confirm() {
    this.dialogRef.close({ event: 'confirm' });
  }

  closed(): void {
    this.dialogRef.close({ event: '' });
  }
}
