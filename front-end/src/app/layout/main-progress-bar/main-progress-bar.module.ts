import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MainProgressBarComponent } from './main-progress-bar.component';
import { MainProgressBarService } from './main-progress-bar.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  providers: [MainProgressBarService],
  declarations: [MainProgressBarComponent],
  exports: [MainProgressBarComponent]
})
export class MainProgressBarModule { }
