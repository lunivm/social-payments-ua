import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoginCheckResponse } from '../../../../../api-contracts/login/login-check-response';
import { environment } from '../../../environments/environment';
import { WindowProvider } from '../providers/window-provider';

@Injectable()
export class AuthService {
  /**
   * Can emit false positive true in a case if token is expired on first APP API call
   */
  public readonly loggedIn$: Observable<boolean>;

  private readonly loggedInSubject = new ReplaySubject<boolean>(1);

  private static readonly tokenKeyName = 'token';

  constructor(private window: WindowProvider, private http: HttpClient) {
    this.loggedIn$ = this.loggedInSubject.asObservable();

    // hook to make API call after constructor finishes object creation
    // otherwise tons of unfinished constructor calls (initiated by DI?) appears causing the same amount of http calls
    setTimeout(this.initialTokenCheck.bind(this));
  }

  private initialTokenCheck(): void {
    if (!this.getToken()) {
      this.loggedInSubject.next(false);
      return;
    } else {
      this.http.get<LoginCheckResponse>(environment.dataQueries.loginEndpoint)
        .subscribe(
          (resp) => this.loggedInSubject.next(resp.isValid),
          () => this.loggedInSubject.next(false)
        )
    }
  }

  public getToken(): string {
    return this.window.localStorage.getItem(AuthService.tokenKeyName);
  }

  public setToken(token: string): void {
    this.window.localStorage.setItem(AuthService.tokenKeyName, token);
    this.loggedInSubject.next(!!token);
  }
}
