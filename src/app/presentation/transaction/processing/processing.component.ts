import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  PartnerEntity,
  ServiceTypeEntity,
  StatusReconciliationEntity,
  ReconciliationEntity,
  ReconciliationAcctFileEntity,
} from '../../../core/entity';

import {
  BreadcrumbService,
  PartnerService,
  ServiceTypeService,
  StatusReconciliationService,
  ReconciliationService,
} from '../../../data/service';
import {
  PayLoadGetReconciliationDto,
  ResponseGetReconciliationDto,
  ResponseGetReconciliationAcctFileDto,
} from '../../../core/dto';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  @HostListener('window:click', ['$event']) handleKeyDown() {
    this.showListPartner = false;
    this.showNamePartner = false;
  }
  isAdmin = true;
  // itemIdChoice: any;
  // itemChoice: any;
  datasTable: ReconciliationAcctFileEntity[] = [];
  minDate = new Date(new Date().getFullYear() - 120, 0, 1);
  maxDate = new Date();
  yesterday: string = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
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

  constructor(
    private partnerService: PartnerService,
    private serviceTypeService: ServiceTypeService,
    private statusReconciliationService: StatusReconciliationService,
    private reconciliationService: ReconciliationService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver
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
  }

  openFormAdd() {
    this.dataItem = {};
    this.showForm = true;
  }

  search() {
    if (this.checkDate(this.filter.startDate, this.filter.endDate)) {
      this.reconciliationService
        .getAllAcct(this.filter)
        .subscribe((datas: ResponseGetReconciliationAcctFileDto) => {
          this.datasTable = datas.datas ? datas.datas : [];
          this.pagination.total = datas.total ? datas.total : 0;
          this.reCaculatorPagination();
        });
    }
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

  // clickRow(item: ReconciliationEntity) {
  //   // if (item.id == this.itemIdChoice) {
  //   //   this.itemIdChoice = null;
  //   // } else {
  //   //   this.itemIdChoice = item.id;
  //   //   this.itemChoice = item;
  //   // }
  // }

  covertPrice(value: number) {
    return value
      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      .replace('VND', 'đ');
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
    let keyword = event.target.value.trim().toLowerCase();
    event.stopPropagation();
    if (!keyword) {
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
    let keyword = event.target.value.trim().toLowerCase();
    event.stopPropagation();
    if (!keyword) {
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
    let start = Date.parse(starDate);
    let end = Date.parse(endDate);
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
}
