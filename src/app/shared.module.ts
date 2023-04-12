import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule,MaterialModule],
  exports: [TranslateModule],
})
export class SharedModule {}
