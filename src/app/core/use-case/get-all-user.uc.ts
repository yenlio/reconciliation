import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUseCase } from '../arch';
import { User } from '../entity';
import { UserRepository } from '../repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllUserUsecase implements IUseCase<void, User> {
  constructor(private userRepository: UserRepository) {}

  execute(params: void): Observable<User> {
    return this.userRepository.getAllUser();
  }
}
