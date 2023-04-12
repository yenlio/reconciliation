import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutsComponent implements OnInit {
  openNavbar = false;
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.openNavbar = true;
        } else {
          this.openNavbar = false;
        }
      });
  }

  clickIconMenu() {
    this.openNavbar = !this.openNavbar;
  }
}
