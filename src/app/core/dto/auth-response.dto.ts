import { PermissionEntity } from '../entity';
import { Role } from './role.dto';

export class AuthResponse {
  constructor(
    public token: string,
    public email: string,
    public type: string,
    public role: Role,
    public permission: PermissionEntity[],
    public username: string,
    public passwordStatus: string
  ) {}
}
