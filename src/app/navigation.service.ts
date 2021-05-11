import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

// optionally use providedIn: 'root' to make this service available in the root of the application.
// Another advantage of this syntax: services can be lazily loaded by Angular and redundant code can be
// removed automatically.
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = [];

  /*
    https://angular.io/api/common/Location
    Location is a service that you can use to interact with the browser's URL.
    It has a back method to navigate back in the platform's history.
   */
  constructor(private router: Router, private location: Location) {
    // https://angular.io/api/router/Event
    // The router instance has an events property which returns an Observable of routing events.
    // Each event tracks the lifecycle of the router.
    this.router.events.subscribe((event) => {
      // NavigationEnd is an event type triggered when a navigation ends successfully.
      // If it ended successfully, push the final url to the navigation history.
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    // Pop the current URL off the stack.
    this.history.pop();
    // Does it have more URL entries after the current URL was removed from the history? Go back.
    // Otherwise the user navigated from somewhere else and we will redirect them to the homepage.
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
