import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  scrollToSection(sectionId: string): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(sectionId);
      });
    });
  }
}
