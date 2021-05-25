import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppStartupModulesModule } from './app-startup-modules.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainNavModule } from './layout/main-nav/main-nav.module';
import { MainProgressBarModule } from './layout/main-progress-bar/main-progress-bar.module';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularMaterialModule,
    AppStartupModulesModule,
    NgxMaskModule.forRoot(),
    MainNavModule,
    MainProgressBarModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
