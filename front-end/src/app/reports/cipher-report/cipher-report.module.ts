import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherReportComponent } from './cipher-report.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { FinancialInstitutionModule } from '../../shared/components/financial-institution/financial-institution.module';
import { CodeKEKModule } from '../../shared/components/code-kek/code-kek.module';
import { CodeKFKModule } from '../../shared/components/code-kfk/code-kfk.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    SharedModule,
    FinancialInstitutionModule,
    CodeKEKModule,
    CodeKFKModule
  ],
  entryComponents: [CipherReportComponent],
  declarations: [CipherReportComponent]
})
export class CipherReportModule { }
