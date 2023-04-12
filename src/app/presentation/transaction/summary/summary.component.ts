import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
  Injectable,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  PartnerEntity,
  ServiceTypeEntity,
  StatusReconciliationEntity,
  ReconciliationEntity,
} from '../../../core/entity';

import {
  BreadcrumbService,
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../data/service';
import {
  PayLoadForgotPassword,
  PayLoadGetReconciliationDto,
  ResponseGetReconciliationDto,
} from '../../../core/dto';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @ViewChild('dowloadLink', { static: true })
  dowloadLink!: ElementRef<HTMLLinkElement>;
  @HostListener('window:click', ['$event']) handleKeyDown() {
    this.showListPartner = false;
    this.showNamePartner = false;
    this.showListType = false;
  }
  @HostListener('window:beforeunload') refresh() {
    localStorage.removeItem('cacheDate');
  }
  isAdmin = true;
  itemIdChoice: any;
  itemChoice: any;
  datasTable: ReconciliationEntity[] = [];
  minDate = new Date(new Date().getFullYear() - 120, 0, 1);
  maxDate = new Date();
  yesterday: any = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  showForm = false;
  showFilter = window.innerWidth <= 991 ? false : true;
  filter: PayLoadGetReconciliationDto = {
    keyword: '',
    pageIndex: 1,
    partnerCode: this.setFilterPartnerCode(),
    typeService: '',
    status: '',
    startDate: this.yesterday,
    endDate: this.yesterday,
    pageSize: environment.pageSize,
  };

  pagination = {
    start: 1,
    end: environment.pageSize,
    page: 1,
    total: 0,
  };
  dataItem: any = {};
  partnerCodes: PartnerEntity[] = [];
  serviceTypes: ServiceTypeEntity[] = [];
  statusReconciliations: StatusReconciliationEntity[] = [];
  fileType = [
    {
      name: 'PDF',
      type: 'application/pdf',
    },
    {
      name: 'EXCEL',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    },
  ];
  constructor(
    private partnerService: PartnerService,
    private serviceTypeService: ServiceTypeService,
    private statusReconciliationService: StatusReconciliationService,
    private reconciliationService: ReconciliationService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.createBreadcrumbs(this.activatedRoute);
    this.partnerService.getAll().subscribe((datas) => {
      datas.unshift({ partnerCode: '', partnerName: 'Tất cả', id: 0 });
      this.partnerCodes = datas;
    });
    this.serviceTypeService.getAll().subscribe((datas) => {
      datas.unshift({ name: 'Tất cả', code: '', id: 0 });
      this.serviceTypes = datas;
    });
    this.statusReconciliationService.getAll().subscribe((datas) => {
      datas.unshift({ description: 'Tất cả', statusCode: '' });
      this.statusReconciliations = datas;
    });

    this.breakpointObserver
      .observe(['(min-width: 991px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showFilter = true;
        } else {
          this.showFilter = false;
        }
      });

    this.search();
    this.checkExportRole();
  }
  // cacheDate = {
  //   startDate: '',
  //   endDate: '',
  // };
  // cacheStatus = '';
  cachePartnerName = 'Tất cả';
  cacheFilter!: PayLoadGetReconciliationDto;

  openFormAdd() {
    this.dataItem = {};
    this.showForm = true;
  }

  search() {
    if (this.filter.partnerCode == 'Tất cả') {
      this.filter.partnerCode = '';
    }

    // if (
    //   localStorage.getItem('cacheDate') &&
    //   localStorage.getItem('cacheStatus')
    // ) {
    //   this.cacheDate = JSON.parse(localStorage['cacheDate']);
    //   this.filter.startDate = this.cacheDate.startDate;
    //   this.filter.endDate = this.cacheDate.endDate;
    //   this.filter.status = localStorage['cacheStatus'];
    // }

    if (
      localStorage.getItem('cacheFilter') &&
      localStorage.getItem('cachePartnerName')
    ) {
      this.cacheFilter = JSON.parse(localStorage['cacheFilter']);
      this.filter = this.cacheFilter;
      this.partnerName = localStorage.getItem('cachePartnerName');
    }

    if (this.checkDate(this.filter.startDate, this.filter.endDate)) {
      this.reconciliationService
        .getAll(this.filter)
        .subscribe((datas: ResponseGetReconciliationDto) => {

          console.log(datas,"du lieu datas");
          
          this.datasTable = datas.datas ? datas.datas : [];

          this.pagination.total = datas.total ? datas.total : 0;
          this.reCaculatorPagination();
        });
    }
    localStorage.removeItem('cacheFilter');
    localStorage.removeItem('cachePartnerName');
    if (window.innerWidth <= 991) {
      this.showFilter = false;
    }
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

  clickRow(item: ReconciliationEntity) {
    if (item.id == this.itemIdChoice) {
      this.itemIdChoice = null;
    } else {
      this.itemIdChoice = item.id;
      this.itemChoice = item;
    }
  }

  covertPrice(value: number) {
    return value
      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      .replace('VND', 'đ');
  }

  routerLink(item: ReconciliationEntity): any {
    // this.cacheDate.startDate = this.filter.startDate;
    // this.cacheDate.endDate = this.filter.endDate;
    // this.cacheStatus = this.filter.status;
    
    this.cacheFilter = this.filter;
    if (this.partnerName) {
      this.cachePartnerName = this.partnerName;
    }
    localStorage.setItem('cachePartnerName', this.cachePartnerName);
    localStorage.setItem('cacheFilter', JSON.stringify(this.cacheFilter));
    // localStorage.setItem('cacheDate', JSON.stringify(this.cacheDate));

    let status = '00';
    if (item.status !== '00') {
      status = '01,02,03';
      this.router.navigateByUrl(
        '/admin/transaction/reconciliation/' +
          item.partnerCode.toLowerCase() +
          '/' +
          moment(new Date(parseInt(item.fromDate + '000'))).format(
            'DD-MM-YYYY'
          ) +
          '/' +
          moment(new Date(parseInt(item.toDate + '000'))).format('DD-MM-YYYY') +
          '/' +
          status
      );
    } else {
      this.router.navigateByUrl(
        '/admin/transaction/reconciliation/' +
          item.partnerCode.toLowerCase() +
          '/' +
          moment(new Date(parseInt(item.fromDate + '000'))).format(
            'DD-MM-YYYY'
          ) +
          '/' +
          moment(new Date(parseInt(item.toDate + '000'))).format('DD-MM-YYYY') +
          '/' +
          status
      );
    }
  }
  completeLink(item: ReconciliationEntity) {
    // this.cacheDate.startDate = this.filter.startDate;
    // this.cacheDate.endDate = this.filter.endDate;
    // this.cacheStatus = this.filter.status;
    // if (
    //   JSON.parse(localStorage['permission']).some(
    //     (item: any) => item === 'rc-View-Details'
    //   )
    // ) {
    this.cacheFilter = this.filter;
    if (this.partnerName) {
      this.cachePartnerName = this.partnerName;
    }
    localStorage.setItem('cachePartnerName', this.cachePartnerName);
    localStorage.setItem('cacheFilter', JSON.stringify(this.cacheFilter));
    // localStorage.setItem('cacheDate', JSON.stringify(this.cacheDate));
    // localStorage.setItem('cacheStatus', this.cacheStatus);
    this.router.navigateByUrl(
      '/admin/transaction/reconciliation/' +
        item.partnerCode.toLowerCase() +
        '/' +
        moment(new Date(parseInt(item.fromDate + '000'))).format('DD-MM-YYYY') +
        '/' +
        moment(new Date(parseInt(item.toDate + '000'))).format('DD-MM-YYYY') +
        '/' +
        item.status
    );
    // return (
    //   '/admin/transaction/reconciliation/' +
    //   item.partnerCode.toLowerCase() +
    //   '/' +
    //   moment(new Date(parseInt(item.fromDate + '000'))).format('DD-MM-YYYY') +
    //   '/' +
    //   moment(new Date(parseInt(item.toDate + '000'))).format('DD-MM-YYYY') +
    //   '/' +
    //   item.status
    // );
    // } else {
    //   alert('Không có quyền truy cập!');
    // }
  }

  setFilterPartnerCode(): string {
    let partnerCode = '';
    let rolesString: any;
    if (localStorage.getItem('roles')) {
      rolesString = localStorage.getItem('roles')
        ? localStorage.getItem('roles')?.toString()
        : '';
    }
    const roles = JSON.parse(rolesString);

    if (roles.includes('ROLE_ACV')) {
      partnerCode = 'ACV';
      this.isAdmin = false;
    }
    if (roles.includes('ROLE_NAPAS')) {
      partnerCode = 'NAPAS';
      this.isAdmin = false;
    }
    return partnerCode;
  }
  exportRole = false;
  showListType = false;
  checkExportRole() {
    let item = JSON.parse(localStorage['permission']);
    if (item.some((i: any) => i === 'rc-Export-Report')) {
      this.exportRole = true;
    }
  }
  showType(event: any, itemChoice: ReconciliationEntity) {
    event.stopPropagation();
    this.showListType = !this.showListType;
  }

  export(item: any, itemChoice: ReconciliationEntity) {
    let fileTypeName = item.name;
    let type = item.type;
    if (!itemChoice) {
      this.openModal();
      return;
    }
    if (this.exportRole) {
      if (this.itemIdChoice == itemChoice.id) {
        const starDate = itemChoice.fromDate;
        const endDate = itemChoice.toDate;
        const partnerCode = itemChoice.partnerCode.toUpperCase();

        const ex_filter = {
          startDate: starDate,
          partnerCode: partnerCode,
          fileType: fileTypeName,
          endDate: endDate,
        };
        this.reconciliationService
          .exportReport(ex_filter)
          .subscribe((datas) => {
            const blob = new Blob([datas], { type: type });
            const url = window.URL.createObjectURL(blob);
            this.dowloadLink.nativeElement.href = url;
            this.dowloadLink.nativeElement.click();
          });
      } else {
        this.openModal();
        return;
      }
    } else {
      let message = '';
      this.translate.get('notRole').subscribe((res: string) => {
        message = res;
      });
      this.dialog.open(Dialog, {
        data: {
          message: message,
        },
      });
    }
  }

  partnerName: any;
  showListPartner = false;
  showNamePartner = false;
  partnerCodesFilter: PartnerEntity[] = [];
  partnerNamesFilter: PartnerEntity[] = [];

  choiceItem(item: any, event: any) {
    event.stopPropagation();
    this.filter.partnerCode = item.partnerCode;
    this.partnerName = item.partnerName;
    this.showListPartner = false;
    this.showNamePartner = false;
  }

  filterPartnerKeyup(event: any) {
    const keyword = event.target.value.trim().toLowerCase();
    event.stopPropagation();
    if (keyword == '') {
      this.partnerName = '';
    } else {
      this.filterPartner(keyword);
    }
  }

  filterPartner(keyword: string) {
    this.showListPartner = true;
    this.showNamePartner = false;
    this.partnerCodesFilter = this.partnerCodes.filter((item) => {
      return item.partnerCode.toLowerCase().includes(keyword);
    });
  }

  filterPartnerClick(event: any) {
    event.stopPropagation();
    this.filterPartner('');
  }

  filterPartnerNameKeyUp(event: any) {
    const keyword = event.target.value.trim().toLowerCase();
    event.stopPropagation();
    if (keyword == '') {
      this.filter.partnerCode = '';
    } else {
      this.filterPartnerName(keyword);
    }
  }

  filterPartnerNameClick(event: any) {
    event.stopPropagation();
    this.filterPartnerName('');
  }

  filterPartnerName(keyword: string) {
    this.showNamePartner = true;
    this.showListPartner = false;
    this.partnerNamesFilter = this.partnerCodes.filter((item) => {
      return item.partnerName.toLowerCase().includes(keyword);
    });
  }

  checkDate(starDate: string, endDate: string) {
    const start = Date.parse(starDate);
    const end = Date.parse(endDate);
    if (!isNaN(start) && !isNaN(end)) {
      if (start > end) {
        this.filter.startDate = this.yesterday;
        this.filter.endDate = this.yesterday;
        return false;
      }
      return true;
    } else {
      this.filter.startDate = this.yesterday;
      this.filter.endDate = this.yesterday;
      return false;
    }
  }

  openModal() {
    let message = '';
    this.translate.get('pickRecord').subscribe((res: string) => {
      message = res;
    });
    this.dialog.open(Dialog, {
      data: {
        message: message,
      },
    });
  }
}
