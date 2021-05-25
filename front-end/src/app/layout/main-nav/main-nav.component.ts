import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SpDialogType } from '../../shared/components/dialog/sp-dialog-type.enum';
import { SpDialogService } from '../../shared/components/dialog/sp-dialog.service';
import { AuthService } from '../../shared/services/auth.service';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'sp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent {
  constructor(
    public currentUserService: CurrentUserService,
    private authService: AuthService,
    private router: Router,
    private spDialogService: SpDialogService
  ) {}

  public logout() {
    this.spDialogService.open({
      type: SpDialogType.Confirm,
      text: 'Бажаєте вийти?'
    })
      .pipe(
        filter((confirmed: boolean) => confirmed)
      )
      .subscribe(() => {
        this.currentUserService.resetUser();
        this.authService.setToken(null);
        this.router.navigate(['/login']);
      });
  }
}
