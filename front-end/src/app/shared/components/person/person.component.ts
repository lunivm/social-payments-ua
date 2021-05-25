import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Person } from '../../../../../../api-contracts/person/person';
import { Street } from '../../../../../../api-contracts/street/street';
import { FilterUtils } from '../../utils/filter-utils';
import { PersonHelper } from '../../utils/person.helper';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { PersonService } from './person.service';
import { StreetService } from './street.service';

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent extends MultifiedAutocompleteCommonComponent implements OnInit {
  @Input() public renderAddressFields: boolean = true;

  public fullName: FormControl;
  public passportNumber: FormControl;
  public identityCode: FormControl;
  public streetName: FormControl;
  public house: FormControl;
  public readonly getPersonAddress = PersonHelper.getPersonAddress;

  public personAutocompleteFilter$: Observable<Person>;
  public steetsFiltered$: Observable<Street[]>;

  private streets: Street[] = [];
  private selectedStreetId: FormControl;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public personService: PersonService,
    private streetService: StreetService
  ) {
    super(cdRef, fb);
  }

  public ngOnInit() {
    super.ngOnInit();

    this.initPersonAutocompleteFilter();
    this.initStreetAutocompleteFilter();
  }

  public streetSelected(streetOption: MatAutocompleteSelectedEvent) {
    this.streetName.setValue(streetOption.option.value.name);
    this.selectedStreetId.setValue(streetOption.option.value._id, {emitEvent: false});
  }

  protected updateFormOnIdChange() {}

  protected createForm(): void {
    const mandatoryFields = {
      _id: [''],
      fullName: ['', this.getConditionalValidator()],
      passportNumber: ['', this.getConditionalValidator()],
      identityCode: ['', this.getConditionalValidator()]
    };

    const optionalFields = this.renderAddressFields ? {
      address: this.fb.group({
        street: this.fb.group({
          _id: [''],
          name: ['', this.getConditionalValidator()],
        }),
        house: ['', this.getConditionalValidator()],
        houseSection: '',
        apartment: ''
      })
    } : null;

    this.form = this.fb.group(Object.assign(mandatoryFields, optionalFields));
  }

  protected initControls() {
    this.fullName = <FormControl> this.form.get('fullName');
    this.passportNumber = <FormControl> this.form.get('passportNumber');
    this.identityCode = <FormControl> this.form.get('identityCode');
    this.streetName = <FormControl> this.form.get('address.street.name');
    this.selectedStreetId = <FormControl> this.form.get('address.street._id');
    this.house = <FormControl> this.form.get('address.house');
  }

  private initPersonAutocompleteFilter() {
    this.personAutocompleteFilter$ = this.form.valueChanges
      .pipe(
        // disable person autocomplete for address section inputs that are not empty
        filter((person: Person) => !person.address || FilterUtils.isEmpty(person.address))
      )
  }

  private initStreetAutocompleteFilter() {
    if (!this.renderAddressFields) {
      return;
    }

    this.streetService.getData()
      .subscribe((streets: Street[]) => this.streets = streets);

    this.steetsFiltered$ = this.streetName.valueChanges
      .pipe(
        filter(() => this.form.dirty),
        tap(() => this.selectedStreetId.setValue(null)),
        map((value: string | Street) => _.isString(value) ? value : value && value.name || ''),
        map((streetInput: string) => this.streets.filter((street: Street) => street.name.toLowerCase().includes(streetInput.toLowerCase())))
      );
  }
}
