import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup
} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FinancialInstitutionComponent } from '../../../shared/components/financial-institution/financial-institution.component';
import { PersonComponent } from '../../../shared/components/person/person.component';
import {
  apiDateFormat,
  displayDateFormat
} from '../../../shared/constants/date-formats';
import { FilterUtils } from '../../../shared/utils/filter-utils';
import { HistoryFilterModel } from '../../shared/history-filter.model';
import { FilterChipConfigModel } from './filter-chip-config.model';
import { FilterType } from './shared/filter-type.enum';
import { CodeKFKComponent } from '../../../shared/components/code-kfk/code-kfk.component';
import { CodeKEKComponent } from '../../../shared/components/code-kek/code-kek.component';

@Component({
  selector: 'sp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent implements AfterViewInit {
  @Output() public filterChange = new EventEmitter<HistoryFilterModel>();
  @Output() public filterEmpty = new EventEmitter<void>();

  public readonly autocompleteClasses = 'sp-payments-history-autocomplete';

  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;
  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;
  @ViewChild(CodeKFKComponent)
  private codeKFKComponent: CodeKFKComponent;
  @ViewChild(CodeKEKComponent)
  private codeKEKComponent: CodeKEKComponent;

  public filterPanelExpanded: boolean = true;

  public filterChips: FilterChipConfigModel[] = [];

  public readonly searchForm = new FormGroup({
    datesRange: new FormGroup({
      dateFrom: new FormControl(),
      dateTo: new FormControl()
    }),
    sumRange: new FormGroup({
      sumFrom: new FormControl(),
      sumTo: new FormControl()
    }),
    description: new FormControl(),
  }, [
    (form: AbstractControl): { [key: string]: any } | null => {
      const searchFormEmpty = FilterUtils.isEmpty(form.value);

      return searchFormEmpty ? {searchFormEmpty} : null;
    }
  ]);

  @HostListener('keyup.enter')
  private onEnter() {
    if (this.searchForm.valid) {
      this.onSearchClick();
    }
  }

  private readonly filterControls: Map<FilterType, AbstractControl> = new Map();

  constructor() {}

  public ngAfterViewInit() {
    this.searchForm.setControl('person', this.personComponent.form);
    this.searchForm.setControl('financialInstitution', this.financialInstitutionComponent.form);
    this.searchForm.setControl('codeKFK', this.codeKFKComponent.codeKFK);
    this.searchForm.setControl('codeKEK', this.codeKEKComponent.codeKEK);

    this.setupFilterControls();
  }

  public onSearchClick(closePanel = true) {
    const formVal = this.searchForm.value;
    formVal.datesRange = FilterUtils.isEmpty(formVal.datesRange) ? formVal.datesRange : _.mapValues(
      formVal.datesRange,
      (val: string) => moment(val).isValid() ? moment(val).format(apiDateFormat) : null
    );

    this.setupFilterChips();

    if (closePanel) {
      this.filterPanelExpanded = false;
    }

    // as any since failed to assert correct type for lodash mapValues
    this.filterChange.emit(formVal as any);
  }

  public onChipClose(filter: FilterType) {
    this.filterControls.get(filter).reset();
    _.remove(this.filterChips, {type: filter});

    if (this.filterChips.length) {
      this.onSearchClick(false);
    } else {
      this.filterPanelExpanded = true;
      this.filterEmpty.emit();
    }
  }

  private setupFilterChips(): void {
    const newFilterChips = [];

    newFilterChips.push(this.getDatesRangeChip());
    newFilterChips.push(this.getSumRangeChip());
    newFilterChips.push(this.getPersonChip());
    newFilterChips.push(this.getFinancialInstitutionChip());
    newFilterChips.push(this.getDescriptionChip());

    this.filterChips = _.compact(newFilterChips);
  }

  private getDatesRangeChip(): FilterChipConfigModel {
    const text = this.getRangeText('datesRange', ['dateFrom', 'dateTo'], ['з', 'по']);

    return text ? {
      text,
      type: FilterType.DateRange
    } : null;
  }

  private getSumRangeChip(): FilterChipConfigModel {
    const text = this.getRangeText('sumRange', ['sumFrom', 'sumTo'], ['від', 'до'], 'грн.');

    return text ? {
      text,
      type: FilterType.SumRange
    } : null;
  }

  private getRangeText(groupName: string, fieldNames: [string, string], prefixes: [string, string], textSuffix: string = ''): string {
    const group = this.searchForm.get(groupName).value;

    if (FilterUtils.isEmpty(group)) {
      return null;
    }

    const from = group[fieldNames[0]];
    const to = group[fieldNames[1]];
    const valueCasting = (val: Moment | number) => moment.isMoment(val) ? val.format(displayDateFormat) : val.toString();

    const fromText = from ? `${prefixes[0]} ${valueCasting(from)}` : '';
    const toText = to ? `${prefixes[1]} ${valueCasting(to)}` : '';

    return `${fromText && toText ? `${fromText} ${toText}` : fromText || toText} ${textSuffix}`.trim();
  }

  private getPersonChip(): FilterChipConfigModel {
    const chipPartial = this.getComponentChip('person', new Map([
      ['fullName', ''],
      ['passportNumber', 'паспорт'],
      ['identityCode', 'ід.№']
    ]));

    return chipPartial ? Object.assign(chipPartial, {type: FilterType.Person}) : null;
  }

  private getFinancialInstitutionChip(): FilterChipConfigModel {
    const chipPartial = this.getComponentChip('financialInstitution', new Map([
      ['name', ''],
      ['mfo', 'МФО'],
      ['edrpou', 'ЄДРПОУ']
    ]));

    return chipPartial ? Object.assign(chipPartial, {type: FilterType.FinancialInstitution}) : null;
  }

  private getComponentChip(groupName: string, fieldPrefixes: Map<string, string>): { text: string, title: string } {
    const group = this.searchForm.get(groupName).value;

    if (FilterUtils.isEmpty(group)) {
      return null;
    }

    const fields: string[] = [];
    fieldPrefixes.forEach((prefix, field) => {
      const fieldVal = group[field];

      if (fieldVal) {
        fields.push(prefix ? `${prefix}: ${fieldVal}` : `${fieldVal}`)
      }
    });

    return {
      text: group._id ? fields[0] : fields.join(', '),
      title: fields.join(', ')
    };
  }

  private getDescriptionChip(): FilterChipConfigModel {
    const descr: string = this.searchForm.get('description').value;

    return descr ? {
      text: `Призначення: ${descr}`,
      type: FilterType.Description
    } : null;
  }

  private setupFilterControls(): void {
    this.filterControls.set(FilterType.DateRange, this.searchForm.get('datesRange'));
    this.filterControls.set(FilterType.Person, this.searchForm.get('person'));
    this.filterControls.set(FilterType.FinancialInstitution, this.searchForm.get('financialInstitution'));
    this.filterControls.set(FilterType.SumRange, this.searchForm.get('sumRange'));
    this.filterControls.set(FilterType.Description, this.searchForm.get('description'));
  }
}
