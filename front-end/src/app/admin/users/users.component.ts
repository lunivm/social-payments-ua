import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatTableDataSource
} from '@angular/material';
import * as _ from 'lodash';
import {
  filter,
  finalize
} from 'rxjs/operators';
import { User } from '../../../../../api-contracts/user/user';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable.component';
import { SpDialogType } from '../../shared/components/dialog/sp-dialog-type.enum';
import { SpDialogService } from '../../shared/components/dialog/sp-dialog.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDialogModel } from './user-dialog/user-dialog.model';
import { UsersService } from './users.service';

@Component({
  selector: 'sp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent extends UnsubscribableComponent implements OnInit {
  public readonly displayedColumns = ['login', 'fullName', 'admin'];
  public usersDataSource = new MatTableDataSource();
  public selectedUser: User = null;

  public showInProgress = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private spDialogService: SpDialogService,
    private usersService: UsersService
  ) {
    super();
  }

  public ngOnInit() {
    this.componentSubscriptions.add(this.usersService.getUsers()
      .subscribe((users: User[]) => {
        this.usersDataSource.data = _.sortBy(users, ['login']);
        this.showInProgress = false;
        this.cdRef.markForCheck();
      })
    );
  }

  public usersTrackFn(index: number, user: User): string {
    return user._id;
  }

  public openUserDialog() {
    const dialog = this.dialog.open(UserDialogComponent, {
      data: this.selectedUser
    });

    dialog.afterClosed().subscribe((userInfo: UserDialogModel) => {
      if (!userInfo) { return; }

      this.usersService.submitUser(userInfo);
    });
  }

  public rowClick(row: User) {
    this.selectedUser = this.selectedUser === row ? null : row;
  }

  public removeUser() {
    // remember currently selected user's id since
    // at the moment when usersService.removeUser (after user confirms dialog prompt) will ask for id
    // which not exists (clicked outside action already removed it)
    const userId = this.selectedUser._id;

    this.spDialogService.open({
      type: SpDialogType.Confirm,
      text: 'Ви справді бажаєте видалити користувача?'
    }).pipe(
      filter((confirmed: boolean) => confirmed)
    )
    .subscribe(() => this.usersService.removeUser(userId));
  }
}
