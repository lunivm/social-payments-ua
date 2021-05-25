import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const routerSlideAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({
        position: 'relative',
        overflow: 'hidden'
      }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: '36px',
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild())
    ])
  ]
);
