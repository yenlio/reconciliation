import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-partners',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss'],
})
export class PartnersListComponent implements OnInit {
  showForm = false;
  filter: any = {
    keyword: '',
  };
  dataItem: any = {};

  constructor() {}

  ngOnInit(): void {}

  openFormAdd() {
    this.dataItem = {};
    this.showForm = true;
  }

  search() {}

  next(data: any) {}
}
