import {
  animate,
  animateChild,
  animation,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

// Creates reusable animation.
export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

// Creates reusable animation including the trigger.
export const triggerAnimation = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transitionAnimation, {
      params: {
        backgroundColor: 'orange',
        height: 0,
        opacity: 1,
        time: '2s',
      },
    }),
  ]),
]);

// Route animation.
// A route change activates the animation trigger,
// and a transition matching the state change is applied.
// https://angular.io/guide/route-animations#animation-definition
export const slideInAnimation = trigger('routeAnimations', [
  transition('BeersPage <=> FavesPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
