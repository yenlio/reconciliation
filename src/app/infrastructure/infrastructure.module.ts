import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InteractionService } from './service/interaction.service';
import * as CoreService from '../core/service';
import { HttpConfigInterceptor } from './httpconfig.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: CoreService.InteractionService, useClass: InteractionService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class InfrastructureModule {}
