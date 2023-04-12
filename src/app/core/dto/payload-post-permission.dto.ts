export class PayLoadPostPermissionDto {
  constructor(
    public action: string,
    public id: number,
    public resource: string
  ) {}
}
