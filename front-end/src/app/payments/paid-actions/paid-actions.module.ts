import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaidActionsComponent } from './paid-actions.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { PaymentsSharedModule } from '../shared/payments-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    PaymentsSharedModule
  ],
  entryComponents: [PaidActionsComponent],
  declarations: [PaidActionsComponent]
})
export class PaidActionsModule { }
