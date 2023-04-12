import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FormUserComponent } from './form-user/form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
import { MaterialModule } from 'src/app/material.module';
// import { BrowserModule } from '@angular/platform-browser'

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    FormUserComponent,
   
  ],
  imports: [
    // BrowserModule,
    MaterialModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
