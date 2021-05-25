import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeKEKComponent } from './code-kek.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  declarations: [CodeKEKComponent],
  exports: [CodeKEKComponent]
})
export class CodeKEKModule { }
