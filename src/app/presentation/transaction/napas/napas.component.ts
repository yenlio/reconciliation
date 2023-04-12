import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { ReconciliationNapasEntity } from '../../../core/entity';

import { ReconciliationService } from '../../../data/service/reconciliation.service';
import {
  PayLoadGetReconciliationPartnerDto,
  ResponseGetReconciliationNapasDto,
} from '../../../core/dto';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../data/service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-napas',
  templateUrl: './napas.component.html',
  styleUrls: ['./napas.component.scss'],
})
export class NapasComponent implements OnInit {
  isNapas = true;
  status = [
    { value: 1, name: 'Thành công' },
    { value: 2, name: 'Thất bại' },
    { value: 3, name: 'Chưa xử lý' },
  ];
  datasTable: ReconciliationNapasEntity[] = [];
  dataStatus: string = '';
  showForm = false;
  filter: PayLoadGetReconciliationPartnerDto = {
    pageIndex: 1,
    partnerCode: 'NAPAS',
    startDate: '',
    endDate: '',
    pageSize: environment.pageSize,
    statusCode: '',
  };
  pagination = {
    start: 1,
    end: environment.pageSize,
    page: 1,
    total: 0,
  };
  showFilter = window.innerWidth <= 991 ? false : true;
  isEdit = false;

  constructor(
    private reconciliationRepositoryService: ReconciliationService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private dialog: MatDialog,
    private router: Router,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // if (this.activatedRoute.snapshot.paramMap.get('status') == '00') {
    //   if (
    //     !JSON.parse(localStorage['permission']).some(
    //       (item: any) => item === 'rc-View-Details'
    //     )
    //   ) {
    //     alert('Không có quyền thực hiện!');

    //     if (
    //       JSON.parse(localStorage['permission']).some(
    //         (item: any) => item === 'rc-View-Summary'
    //       )
    //     ) {
    //       this.router.navigateByUrl('/admin/transaction/reconciliation');
    //     } else {
    //       this.router.navigateByUrl('/login');
    //     }
    //   }
    // }
    this.isEdit = JSON.parse(localStorage['permission']).some(
      (item: any) => item === 'rc-Update-Details'
    );
    this.breadcrumbService.createBreadcrumbs(this.activatedRoute);
    this.filter.startDate = this.activatedRoute.snapshot.paramMap
      .get('startDate')
      ?.split('-')
      .reverse()
      .join('-');
    this.filter.endDate = this.activatedRoute.snapshot.paramMap
      .get('endDate')
      ?.split('-')
      .reverse()
      .join('-');
    this.filter.statusCode =
      this.activatedRoute.snapshot.paramMap.get('status');
    this.breakpointObserver
      .observe(['(min-width: 991px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showFilter = true;
        } else {
          this.showFilter = false;
        }
      });
    this.checkRole();
    this.search();
  }

  cacheItem = {};
  cacheData: any = [];
  saveCache(item: ReconciliationNapasEntity) {
    this.cacheItem = item;
    let itemIndex = this.cacheData.findIndex(
      (x: any) => x.transactionId === item.transactionId
    );
    if (itemIndex >= 0) {
      this.cacheData[itemIndex] = this.cacheItem;
    } else {
      this.cacheData.push(this.cacheItem);
    }
  }

  search() {
    this.reconciliationRepositoryService
      .getReconciliationPartnerNapas(this.filter)
      .subscribe((datas: ResponseGetReconciliationNapasDto) => {
        this.datasTable = datas.datas.map((item) => {
          for (let key of this.cacheData) {
            if (key.transactionId == item.transactionId) {
              return key;
            }
          }
          return item;
        });
        // this.datasTable = datas.datas;
        this.pagination.total = datas.total;
        this.dataStatus = datas.status;
        this.reCaculatorPagination();
      });
  }

  next() {
    if (this.pagination.end < this.pagination.total) {
      this.pagination.page += 1;
      this.filter.pageIndex = this.pagination.page;
    }
    this.reCaculatorPagination();
    this.search();
  }

  prev() {
    if (this.pagination.start > 1) {
      this.pagination.page -= 1;
      this.filter.pageIndex = this.pagination.page;
    }
    this.reCaculatorPagination();
    this.search();
  }

  reCaculatorPagination() {
    this.pagination.start =
      (this.pagination.page - 1) * environment.pageSize + 1 >
      this.pagination.total
        ? this.pagination.total
        : (this.pagination.page - 1) * environment.pageSize + 1;
    this.pagination.end =
      this.pagination.start + environment.pageSize - 1 > this.pagination.total
        ? this.pagination.total
        : this.pagination.start + environment.pageSize - 1;
  }

  covertPrice(value: number) {
    return value
      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      .replace('VND', '');
  }

  acceptPartnerResult(item: ReconciliationNapasEntity) {
    if (!this.isNapas) {
      item.rcEpayAmount = item.rcNapasAmount;
      item.rcEpayStatus = item.rcNapasStatus;
      this.cacheData.push(item);
    } else {
      item.rcNapasAmount = item.rcEpayAmount;
      item.rcNapasStatus = item.rcEpayStatus;
      this.cacheData.push(item);
    }
  }

  confirm() {
    this.filter.pageIndex = 1;
    let itemId = this.cacheData.map((item: any) => item.transactionId);
    let item = itemId.filter(
      (i: any, index: any) => itemId.indexOf(i) === index
    );
    if (item.length > 0) {
      this.reconciliationRepositoryService
        .updateReconciliationsPartnerNapas(this.datasTable)
        .subscribe((datas: ReconciliationNapasEntity[]) => {

          console.log(datas,"du lieu napas" );
          
          this.dialog.open(Dialog, {
            data: {
              message: `Các giao dịch ${item.toString()} đã được xử lý!`,
              success: true,
            },
          });
          this.search();
          this.cacheData = [];
        });
    } else {
      this.dialog.open(Dialog, {
        data: {
          message: `Không có giao dịch nào để xử lý!`,
        },
      });
    }
  }

  checkPrice(event: any) {}

  backToReconciliationTransaction() {
    this.router.navigate(['/admin/transaction/reconciliation']);
  }

  parseInt(value: string): number {
    return parseInt(value);
  }

  checkRole() {
    const roles = JSON.parse(localStorage['roles']);
    this.isNapas = roles.every((role: any) => role == 'ROLE_NAPAS');
  }
}

@Directive({
  selector: '[NegativeNumber]',
})
export class NegativeNumberDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any) {
    if (
      e.key === '-' ||
      e.code === 'Minus' ||
      e.keyCode === 189 ||
      e.key === '.' ||
      e.keyCode === 190 ||
      e.code === 'Period'
    ) {
      e.preventDefault();
    }
  }
}
