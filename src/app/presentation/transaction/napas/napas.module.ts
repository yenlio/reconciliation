import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NapasComponent, NegativeNumberDirective } from './napas.component';
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
    component: NapasComponent,
  },
];

@NgModule({
  declarations: [NapasComponent, NegativeNumberDirective],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [NapasComponent],
  providers: [
    PartnerService,
    ServiceTypeService,
    StatusReconciliationService,
    ReconciliationService,
  ],
})
export class NapasModule {}
