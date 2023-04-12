export class ReconciliationAcctFileEntity {
    constructor(
      public id: number,
      public fileName: string,
      public processDate: string,
      public partnerCode: string,
      public partnerName: string,
      public typeService: string,
      public fromDate: string,
      public toDate: string,
      public totalTransaction: number,
      public totalAmount: number,
      public status: string,
      public description: string
    ) {}
  }
  