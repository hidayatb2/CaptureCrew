import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CaptureCrew';

  isNavbarVisible = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const headerHeight = document.querySelector('cc-header')?.clientHeight || 0;
    this.isNavbarVisible = window.scrollY > headerHeight;
  }
}
