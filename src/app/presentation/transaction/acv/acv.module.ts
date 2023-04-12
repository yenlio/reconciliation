import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ACVComponent, NegativeNumberDirective } from './acv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
import { MaterialModule } from '../../../material.module';
import {
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../data/service';
const routes: Routes = [
  {
    path: '',
    component: ACVComponent,
  },
];

@NgModule({
  declarations: [ACVComponent, NegativeNumberDirective],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [ACVComponent],
  providers: [
    PartnerService,
    ServiceTypeService,
    StatusReconciliationService,
    ReconciliationService,
  ],
})
export class ACVModule {}
