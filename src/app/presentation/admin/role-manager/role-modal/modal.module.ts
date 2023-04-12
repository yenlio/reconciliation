import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared.module';
import { MaterialModule } from '../../../../material.module';
import {
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../../data/service';
import { Routes } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: ModalComponent,
  },
];

@NgModule({
  declarations: [ModalComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [ModalComponent],
  providers: [
    PartnerService,
    ServiceTypeService,
    StatusReconciliationService,
    ReconciliationService,
  ],
})
export class ModalModule {}
