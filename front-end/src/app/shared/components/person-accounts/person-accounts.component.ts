import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PersonAccount } from '../../../../../../api-contracts/person-accounts/person-account';
import { PersonAccounts } from '../../../../../../api-contracts/person-accounts/person-accounts';
import { PersonFinancialInstitutions } from '../../../../../../api-contracts/person-accounts/person-financial-institutions';
import { FinancialInstitutionService } from '../financial-institution/financial-institution.service';
import { PersonAccountSelectedModel } from './person-account-selected.model';

@Component({
  selector: 'sp-person-accounts',
  templateUrl: './person-accounts.component.html',
  styleUrls: ['./person-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonAccountsComponent {
  @Input() public personAccounts: PersonAccounts;

  @Output() public accountSelected = new EventEmitter<PersonAccountSelectedModel>();

  constructor(public financialInstitutionService: FinancialInstitutionService) {}

  public onAccountSelected(fi: PersonFinancialInstitutions, account: PersonAccount) {
    this.accountSelected.emit({
      id: this.personAccounts._id,
      person: this.personAccounts.personId,
      financialInstitution: fi,
      account
    })
  }
}
