export class UserAPI {
  constructor(
    public total: number,
    public datas: number,
    public createBy: string,
    public createDate: string,
    public email: string,
    public fullName: string,
    public id: 0,
    public isActive: number,
    public loginFailCount: 0,
    public loginFreezeTime: string,
    public modifyDate: string,
    public password: string,
    public passwordStatus: string,
    public phone: string,
    public roles: [],
    public userStatus: number,
    public username: string,
    public errorCode:string
  ) {}
}
