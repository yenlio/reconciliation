import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
})
export class VersionComponent implements OnInit {
  version = '';

  constructor() {}

  ngOnInit(): void {
    this.version = `Ver ${environment.version}`;
  }
}
