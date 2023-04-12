import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent, FormatTimePipe } from './forgot.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ChangeComponent } from './change-password/change.component';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { SharedModule } from '../../../shared.module';
import { NotificationModule } from '../../shared/forgot-password-notification/notification.module';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotComponent,
  },
  {
    path: 'change-password',
    component: ChangeComponent,
  },
  {
    path: 'confirm-otp',
    component: ConfirmOtpComponent,
  },
];

@NgModule({
  declarations: [
    ForgotComponent,
    ChangeComponent,
    ConfirmOtpComponent,
    FormatTimePipe,
  ],
  imports: [
    NotificationModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule, ChangeComponent, ConfirmOtpComponent, FormatTimePipe],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [ForgotComponent],
})
export class ForgotModule {}
