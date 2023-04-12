import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
const routes: Routes = [
  {
    path: '',
    component: PartnersListComponent,
  },
];

@NgModule({
  declarations: [PartnersListComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PartnersModule {}
