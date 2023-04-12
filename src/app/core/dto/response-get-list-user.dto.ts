import { User } from '../entity';
export class ResponseGetListUserDto {
  constructor(public total: number, public datas: User[]) {}
}
