import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { WindowProvider } from '../providers/window-provider';
import { CurrentUserModel } from './current-user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private static readonly userKeyName = 'user';
  private static readonly requestUrl = environment.dataQueries.loginEndpoint;

  constructor(private http: HttpClient, private window: WindowProvider) { }

  public setUser(userInfo: CurrentUserModel): void {
    this.window.localStorage.setItem(CurrentUserService.userKeyName, JSON.stringify(userInfo));
  }

  public getUser(): CurrentUserModel {
    return JSON.parse(this.window.localStorage.getItem(CurrentUserService.userKeyName)) || {};
  }

  public resetUser(): void {
    this.setUser(null);
    this.http.delete(CurrentUserService.requestUrl).subscribe();
  }
}
