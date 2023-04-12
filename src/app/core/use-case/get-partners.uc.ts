import { IUseCase, Presenter } from '../arch';
import { PartnerEntity } from '../entity';
import { PartnerRepository } from '../repository';
import { Injectable } from '@angular/core';

export abstract class ShowPartnerListPresenter<T> extends Presenter<T> {
  public abstract getPartners(partners: PartnerEntity[]): void;
}

@Injectable({ providedIn: 'root' })
export class ShowPartnerListUseCase
  implements IUseCase<void, ShowPartnerListPresenter<any>>
{
  constructor(
    public readonly presenter: ShowPartnerListPresenter<any>,
    private readonly repository: PartnerRepository
  ) {}

  public async execute(request: void): Promise<void> {
    try {
      this.repository.getAll().subscribe((data) => {
     
      });
    } catch (e) {
      console.error('Failed to load or present to dos: %o', e);
      throw e;
    }
  }
}
