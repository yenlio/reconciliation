import { User } from '../entity';
export class PayloadGetListUserDto {
  constructor(
    public createDate: string,
    public email: string,
    public fullName: string,
    public pageIndex: number,
    public pageSize: number,
    public phone: string,
    public username: string
  ) {}
}
