import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  
  @ViewChild('wrapper') wrapper;
  
  public loaded = false;

  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // open load
        this.loaded = false;
      } else if (event instanceof NavigationEnd) {
        // close load
        setTimeout (() => {
          this.loaded = true;
        }, 2000);
      }
    });
  }
}