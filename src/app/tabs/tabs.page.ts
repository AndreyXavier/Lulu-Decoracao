// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss']
// })

// export class TabsPage {
//   selectedTab = 'tab1'; // Tab inicialmente selecionada

//   constructor() {}

//   selectTab(tab: string) {
//     this.selectedTab = tab;
//   }
// }
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab = 'tab1'; // Tab inicialmente selecionada

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegment = event.url.split('/');
        const tab = urlSegment[urlSegment.length - 1];
        this.selectTab(tab);
      }
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
