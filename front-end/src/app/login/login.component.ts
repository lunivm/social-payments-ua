import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../../api-contracts/login/login-response';
import { SpDialogType } from '../shared/components/dialog/sp-dialog-type.enum';
import { SpDialogService } from '../shared/components/dialog/sp-dialog.service';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public login: string;
  public password: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router,
    private spDialogService: SpDialogService
  ) {}

  public loginRequest() {
    this.loginService.requestLogin(this.login, this.password).subscribe(
      (res: LoginResponse) => {
        if (res.authorized) {
          this.router.navigate(['/payments']);
        }
      },
      (error: any) => {
        let text: string;

        if (!error) {
          text = 'Невідома помилка';
        } else {
          switch (error.status) {
            case 0:
              text = 'Помилка з\'єднання з сервером';
              break;
            case 401:
              text = 'Невірний логін або пароль';
              break;
            default:
              text = error.message;
          }
        }

        this.spDialogService.open(
          {
            type: SpDialogType.Alert,
            title: 'Помилка',
            text
          },
         {
            panelClass: 'sp-login-error-alert'
          });
      }
    );
  }
}
