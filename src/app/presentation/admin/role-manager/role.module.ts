import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
import { MaterialModule } from '../../../material.module';
import {
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../data/service';
import { ModalComponent } from './role-modal/modal.component';
import { AuthGuard } from '../../../guard/auth.guard';
import { Role } from '../../../core/dto/role.dto';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm/confirm.component';
const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: '',
    component: RoleComponent,
    loadChildren: () =>
      import('./role-modal/modal.module').then((m) => m.ModalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
];

@NgModule({
  declarations: [RoleComponent, ConfirmDialog],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [RoleComponent, ConfirmDialog],
  providers: [
    PartnerService,
    ServiceTypeService,
    StatusReconciliationService,
    ReconciliationService,
  ],
})
export class RoleModule {}
