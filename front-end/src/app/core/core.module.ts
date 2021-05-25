import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import * as moment from 'moment';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    this.setUpMomentLocale();
  }

  private setUpMomentLocale() {
    moment.updateLocale('uk', {
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY р.',
        LLL: 'D MMMM YYYY р., HH:mm',
        LLLL: 'dddd, D MMMM YYYY р., HH:mm'
      }
    });

    moment.locale('uk');
  }
}
