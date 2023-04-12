import { Roles } from '../entity/role.entity';
export interface ValidateUserDto {
    createBy: string;
    createDate: string;
    email: string;
    fullName: string;
    id?: number;
    isActive: number;
    loginFailCount: number;
    loginFreezeTime: string;
    modifyDate: string;
    password: string;
    passwordStatus: string;
    phone: string;
    roles: Roles[];
    userStatus: number;
    username: string;
    errorDetails:string

    
   
  }
  