import { PermissionEntity } from "../entity";

export class ResponseGetFullRolesDto {
    constructor(
      public id: number,
      public name: string,
      public permission: PermissionEntity[],
    ) {}
  }