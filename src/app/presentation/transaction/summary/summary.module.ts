import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
import { MaterialModule } from '../../../material.module';
import {
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../data/service';
import { Dialog } from '../../shared/dialog/dialog.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const ISO_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent,
  },
];

@NgModule({
  declarations: [SummaryComponent, Dialog],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [SummaryComponent, Dialog],
  providers: [
    PartnerService,
    ServiceTypeService,
    StatusReconciliationService,
    ReconciliationService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: ISO_FORMAT },
  ],
})
export class SummaryModule {}
