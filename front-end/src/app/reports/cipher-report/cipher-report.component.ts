import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { CodeKFKComponent } from '../../shared/components/code-kfk/code-kfk.component';
import { CodeKEKComponent } from '../../shared/components/code-kek/code-kek.component';
import { CipherReportService } from './cipher-report.service';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';

@Component({
  selector: 'sp-cipher-report',
  templateUrl: './cipher-report.component.html',
  styleUrls: ['./cipher-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CipherReportComponent {
  public date: Moment = null;
  public cipherCode = '';
  public reportNumber = '';

  public get buttonDisabled(): boolean {
    return !this.date ||
      !this.codeKEKComponent.codeKEK.value ||
      !this.codeKFKComponent.codeKFK.value ||
      !this.reportNumber ||
      !this.cipherCode;
  }

  @ViewChild(CodeKFKComponent)
  private codeKFKComponent: CodeKFKComponent;
  @ViewChild(CodeKEKComponent)
  private codeKEKComponent: CodeKEKComponent;
  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;

  constructor(private cipherReportService: CipherReportService) { }

  public onGenerateClick() {
    this.cipherReportService.requestReport({
      date: this.date,
      codeKFK: this.codeKFKComponent.codeKFK.value,
      codeKEK: this.codeKEKComponent.codeKEK.value,
      reportNumber: this.reportNumber,
      cipherCode: this.cipherCode,
      financialInstitution: this.financialInstitutionComponent.form.value

    } as any);
  }
}
