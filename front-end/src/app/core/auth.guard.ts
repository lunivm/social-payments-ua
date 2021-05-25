import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.doLoginCheck();
  }

  private doLoginCheck(): Observable<boolean> {
    return this.authService.loggedIn$
      .pipe(
        tap((loggedIn: boolean) => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
