import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../../shared/angular-material/angular-material.module';
import {SharedModule} from '../../shared/shared.module';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {UsersComponent} from './users.component';
import {UsersService} from './users.service';
import {SpDialogModule} from '../../shared/components/dialog/sp-dialog.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SpDialogModule
  ],
  declarations: [UsersComponent, UserDialogComponent],
  entryComponents: [UserDialogComponent],
  providers: [UsersService],
  exports: [UsersComponent]
})
export class UsersModule { }
