import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends MultifiedAutocompleteCommonComponent {
  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public financialInstitutionService: FinancialInstitutionService
  ) {
    super(cdRef, fb);
  }

  protected updateFormOnIdChange() {
    if (!this.form) {
      return;
    }

    this.financialInstitutionService.getById(this.id).subscribe((fiItem: FinancialInstitution) => {
      if (fiItem) {
        this.form.patchValue(fiItem, {emitEvent: false});
        this.allFieldsEmtpy = false;
      } else {
        this.reset();
      }
    });
  }

  protected createForm(): void {
    this.form = this.fb.group({
      _id: [''],
      name: ['', this.getConditionalValidator()],
      mfo: ['', this.getConditionalValidator()],
      edrpou: ['', this.getConditionalValidator()]
    });
  }

  protected initControls(): void {}
}
