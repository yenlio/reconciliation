import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
	selector: 'app-user-groups',
	templateUrl: './user-groups.component.html',
	styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {

	showForm: boolean = false;
	filter: any = {
		keyword: ""
	}
	dataItem: any = {};

	constructor(

	) { }

	ngOnInit(): void {
	}

	openFormAdd() {
		this.dataItem = {};
		this.showForm = true;
	}

	search() {

	}

	next(data: any) {

	}
}
