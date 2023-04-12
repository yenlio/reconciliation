import { Roles } from './role.entity';
export interface UserManager {
  checked?: boolean;
  createBy: string;
  createDate: string;
  email: string;
  fullName: string;
  id: 0;
  isActive: number;
  loginFailCount: 0;
  loginFreezeTime: string;
  modifyDate: string;
  password: string;
  passwordStatus: string;
  phone: string;
  roles: Roles[];
  userStatus: number;
  username: string;
}
