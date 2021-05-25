import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';
import * as _ from 'lodash';
import {
  filter,
  map
} from 'rxjs/operators';
import { routerSlideAnimation } from './router-slide-animation';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    routerSlideAnimation
  ]
})
export class AppComponent implements OnInit {
  public renderMenu: boolean;
  public mainSpinnerVisible = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe((url: string) => {
        this.renderMenu = url !== '/login';
        this.cdRef.markForCheck();
      });
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
    return _.get(outlet, 'activatedRouteData.animation', false);
  }
}
