import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Directive({
  selector: '[appBackButton]'
})
export class BackButtonDirective {

  constructor(private navigation: NavigationService) { }

  /*
    https://angular.io/api/core/HostListener
    A decorator with which you can declare a DOM click event to listen for
    and use an onClick handler method to run when it occurs.

    Angular invokes the handler method when the host element
    (in this case a button element in beer-detail.component.html)
    emits the click event. It will then update the bound element (our button) with the result.

    When it occurs, use the back method of our custom navigation service.
  */
  @HostListener('click')
  onClick(): void {
    this.navigation.back()
  }
}
