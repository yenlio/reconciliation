import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../data/service';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(public breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void { }
}
