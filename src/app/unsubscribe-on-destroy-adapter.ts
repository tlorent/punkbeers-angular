// https://blog.angulartraining.com/how-to-automatically-unsubscribe-your-rxjs-observables-tutorial-2f98b0560298#e232

import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

/**
  * A class that automatically unsubscribes all observables when
  * the object gets destroyed.
*/
@Component({
  template: ''
})
export class UnsubscribeOnDestroyAdapter implements OnDestroy {
  /**The subscription sink object that stores all subscriptions */
  subs = new SubSink();

  /**
    * The lifecycle hook that unsubscribes all subscriptions
    * when the component / object gets destroyed
  */
 /*
    Unsubscribe from the Subject/subscription, otherwise it will continue subscribing for changes
    and cause memory leaks. Only necessary for subscriptions on custom Subjects,
    not Angular Subjects like activatedRoute.params.

    Examples of memory leaks: when you make an HTTP request and the user clicks away
    to another page before the request completes. Result: ghost subscription!

    Why ngOnDestroy? This method will always be called when a component gets removed from the DOM.
    */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
