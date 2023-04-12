import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../data/service';
import { AuthResponse, AuthRequest } from '../../../core/dto';

import { GenOTPResponse, PayLoadForgotPassword } from '../../../core/dto';
import { ForgotService } from '../../../data/service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  checkButton:boolean=true
  canvas!: HTMLCanvasElement;
  text: any;
  text1: any;
  constructor(
    private router: Router,
    private authRepositoryService: AuthenticationService,
    private forgotService: ForgotService
  ) {}
  statusChangePasswordFirstLogin = false;
  username = '';
  errorForm: any = {};
  email = '';
  transactionID = '';
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    recaptchaReactive: new FormControl(null, Validators.required),
    inputCapcha:new FormControl('')
  });

  ngOnInit(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('permission');
    localStorage.removeItem('username');
  }
  ngAfterViewInit(){
    this.render()
  }
  checkCapcha(){
    console.log(this.loginForm.value, 'value');
    if(this.loginForm.value.inputCapcha===this.text){
      this.checkButton=false
      this.errorForm.capcha = '';
    }
    else{
      this.checkButton=true
      this.errorForm.capcha = 'Mã capcha nhập sai';
    }
  }
  render() {
    this.text = this.generateCaptcha(6);
    // this.text1 = this.generateCaptcha(4);
     this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    if(this.canvas){
      var ctx = this.canvas.getContext('2d');
      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i <= 3; i++) {
    if(ctx){
        ctx.font = "30px Georgia";
        ctx.textAlign="left";
        ctx.fillStyle = randomColor();
        ctx.fillText(this.text, 120, 40);
      
      }
    }
      ctx?.strokeText(this.text, 100, 37);

    }
  }

  generateCaptcha(lengthOtp: any): string {
    var charsArray =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      var index = Math.floor(Math.random() * charsArray.length + 1);
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    return captcha.join('');
  }

  login() {
    const formData = this.loginForm.value as AuthRequest;
    this.authRepositoryService.login(formData).subscribe({
      next: (response: AuthResponse) => {
        if (response.passwordStatus != '1') {
          this.username = response.username;
          this.email = response.email;

          const obj: PayLoadForgotPassword = {
            functionType: 1,
            userName: this.username,
            transactionID: '',
            email: this.email,
          };

          this.forgotService.genOTP(obj).subscribe((data: GenOTPResponse) => {
            if (data.errorCode == 0) {
              this.statusChangePasswordFirstLogin = true;
              this.transactionID = data.transactionID;
            } else {
              alert('Hệ thống gặp sự cố. Chúng tôi đang khắc phục.');
            }
          });
        } else {
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('roles', JSON.stringify(response.role));
          localStorage.setItem(
            'permission',
            JSON.stringify(response.permission)
          );
          if (response.role.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin/rights-groups']);
          } else {
            this.router.navigate(['/admin/transaction/reconciliation']);
          }
        }
      },
      error: (err) => {
        alert('Tài khoản không đúng');
      },
      complete: () => console.log('complete'),
    });
  }
}
function randomColor () {
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}