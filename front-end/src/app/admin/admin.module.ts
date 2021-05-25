import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { UsersModule } from './users/users.module';
import { GeneralComponent } from './general/general.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    UsersModule
  ],
  declarations: [AdminComponent, GeneralComponent]
})
export class AdminModule { }
