import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../../../api-contracts/login/login-response';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private currentUserService: CurrentUserService
  ) {}

  public requestLogin(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.dataQueries.loginEndpoint, {login, password})
      .pipe(
        tap(({token, fullName, isAdmin}) => {
          this.authService.setToken(token);
          this.currentUserService.setUser({
            fullName,
            isAdmin
          });
        })
      );
  }
}
