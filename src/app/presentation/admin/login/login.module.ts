import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../../shared.module';


// import { RecaptchaModule } from "ng-recaptcha";
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ChangePasswordFirstLoginComponent } from '../change-password-first-login/change-password-first-login.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, ChangePasswordFirstLoginComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [],
})
export class LoginModule {}
