import { Injectable } from '@angular/core';
import * as CoreService from '../../core/service';

@Injectable({
  providedIn: 'root',
})
export class InteractionService implements CoreService.InteractionService {
  constructor() {}

  public async confirm(message: string): Promise<boolean> {
    return confirm(message);
  }

  public async enterString(currentValue?: string): Promise<string | null> {
    return prompt('Input:', currentValue);
  }
}
