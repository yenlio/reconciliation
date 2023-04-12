import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { FormUserGroupsComponent } from './form-user-groups/form-user-groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
const routes: Routes = [
  {
    path: '',
    component: UserGroupsComponent
  }
];



@NgModule({
  declarations: [
    UserGroupsComponent,
    FormUserGroupsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserGroupsModule { }
