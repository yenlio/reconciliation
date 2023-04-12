import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-form-user-groups',
	templateUrl: './form-user-groups.component.html',
	styleUrls: ['./form-user-groups.component.scss']
})
export class FormUserGroupsComponent implements OnInit {

	userGroups: any;
	changePassword = false;
	@Input() data: any = {};
	@Input() showForm: boolean = false;
	@Output() showFormChange = new EventEmitter<any>();
	@Output() search = new EventEmitter<any>();

	constructor(

	) {
	}

	errorForm: any = {

	}


	ngOnInit(): void {
		
	}

	checkFullname() {
		if (!this.data.fullname) {
			this.errorForm.fullname = "Họ và tên không được bỏ trống";
			return;
		}

		this.errorForm.fullname = "";
		return;
	}

	checkUsername() {
		if (!this.data.username) {
			this.errorForm.username = "Tên đăng nhập không được bỏ trống";
			return;
		}

		if (!/^(?=.{8,}$)[a-z0-9]+$/.test(this.data.username)) {
			this.errorForm.username = "Tên đăng nhập không đúng định dạng";
			return;
		}

		this.errorForm.username = "";
		return;
	}

	checkPassword() {
		if (!this.data.password) {
			this.errorForm.password = "Mật khẩu không được bỏ trống";
			return;
		}

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.data.password)) {
			this.errorForm.password = "Mật khẩu không đúng định dạng";
			return;
		}

		this.errorForm.password = "";
		return;
	}

	save(close: boolean = false) {
		this.checkFullname();
		this.checkUsername();
		if (this.data.id) {
			if (this.changePassword) {
				this.checkPassword();
			}
		} else {
			this.checkPassword();
		}

		for (let key of Object.keys(this.errorForm)) {
			if (this.errorForm[key]) {
				return;
			}
		}
		if (this.data.id) {

		} else {

		}

	}

	getDataById(id: string) {

	}

	closeForm() {
		this.showForm = false;
		this.showFormChange.emit(this.showForm);
		this.search.emit();
	}
}
