import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../../../../../api-contracts/user/user';
import { environment } from '../../../environments/environment';
import { UserDialogModel } from './user-dialog/user-dialog.model';

@Injectable()
export class UsersService {
  private readonly requestUrl = `${environment.dataQueries.apiEndpoint}/users`;

  private userListSubject: Subject<User[]>;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    if (!this.userListSubject) {
      this.userListSubject = new Subject<User[]>();
    }

    this.updateUserList();

    return this.userListSubject.asObservable();
  }

  public submitUser(userInfo: UserDialogModel): void {
    const user: User = Object.assign(userInfo.user, {password: userInfo.password});
    let req: Observable<null>;

    if (!userInfo.user._id) {
      req = this.http.post<null>(this.requestUrl, user);
    } else {
      req = this.http.put<null>(this.requestUrl + '/' + user._id, user);
    }

    req.subscribe(this.updateUserList.bind(this));
  }

  public removeUser(id: string): void {
    this.http.delete<null>(this.requestUrl + '/' + id)
      .subscribe(this.updateUserList.bind(this));
  }

  private updateUserList() {
    this.http.get<User[]>(this.requestUrl).subscribe((users) => this.userListSubject.next(users));
  }
}
