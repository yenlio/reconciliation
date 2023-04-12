export class ResponsePostPermissionDto {
  constructor(
    public id: string,
    public errorCode: string,
    public errorDetails: string
  ) {}
}
