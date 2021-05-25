import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FinancialInstitutionModule } from '../../shared/components/financial-institution/financial-institution.module';
import { PersonAccountsModule } from '../../shared/components/person-accounts/person-accounts.module';
import { PersonModule } from '../../shared/components/person/person.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment.component';
import { SelectPersonAccountDialogComponent } from './select-person-account-dialog/select-person-account-dialog.component';
import { SelectPersonAccountDialogService } from './select-person-account-dialog/select-person-account-dialog.service';
import { CodeKFKModule } from '../../shared/components/code-kfk/code-kfk.module';
import { CodeKEKModule } from '../../shared/components/code-kek/code-kek.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FinancialInstitutionModule,
    PerfectScrollbarModule,
    PersonAccountsModule,
    PersonModule,
    ReactiveFormsModule,
    SharedModule,
    CodeKFKModule,
    CodeKEKModule
  ],
  entryComponents: [PaymentComponent, SelectPersonAccountDialogComponent],
  declarations: [PaymentComponent, SelectPersonAccountDialogComponent],
  providers: [SelectPersonAccountDialogService]
})
export class PaymentModule { }
