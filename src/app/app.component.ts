import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reconciliation-app';
  constructor(public translateService: TranslateService) {
    translateService.addLangs(['en', 'vi']);
    translateService.use(localStorage.getItem("lang")||"vi");
    // translateService.setDefaultLang('vi');
  }
}
