import { IUseCase, Presenter } from '../arch';
import { SampleEntity } from '../entity';
import { SampleRepository } from '../repository';
import { Injectable } from '@angular/core';

export abstract class ShowSampleListPresenter<T> extends Presenter<T> {
  public abstract displaySamples(samples: SampleEntity[]): void;
}

@Injectable({ providedIn: 'root' })
export class ShowSampleListUseCase
  implements IUseCase<void, ShowSampleListPresenter<any>>
{
  constructor(
    public readonly presenter: ShowSampleListPresenter<any>,
    private readonly repository: SampleRepository
  ) {}

  public async execute(request: void): Promise<void> {
    try {
      const allSamples = await this.repository.getAll();
      this.presenter.displaySamples(allSamples);
    } catch (e) {
      console.error('Failed to load or present to dos: %o', e);
      throw e;
    }
  }
}
