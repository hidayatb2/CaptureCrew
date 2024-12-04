import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'cc-header',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isNavbarVisible = false;
  private lastScrollPosition = 0;
  private scrollThreshold = 100; // Minimum scroll distance required
  private consecutiveUpScrolls = 0;
  private requiredUpScrolls = 3; // Number of consecutive up scrolls needed

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.scrollY;
    const headerHeight = document.querySelector('cc-header')?.clientHeight || 0;

    // If we haven't scrolled past header, keep navbar hidden
    if (currentScroll <= headerHeight) {
      this.isNavbarVisible = false;
      this.consecutiveUpScrolls = 0;
      return;
    }

    // Calculate scroll difference
    const scrollDifference = currentScroll - this.lastScrollPosition;

    // Determine scroll direction
    if (scrollDifference < 0) { // Scrolling up
      this.consecutiveUpScrolls++;
      if (this.consecutiveUpScrolls >= this.requiredUpScrolls && 
          Math.abs(scrollDifference) > this.scrollThreshold) {
        this.isNavbarVisible = false;
      }
    } else if (scrollDifference > 0) { // Scrolling down
      this.consecutiveUpScrolls = 0;
      this.isNavbarVisible = true;
    }

    this.lastScrollPosition = currentScroll;
  }
}
