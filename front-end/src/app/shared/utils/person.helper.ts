import * as _ from 'lodash';
import { PersonAddress } from '../../../../../api-contracts/person/person-address';

export class PersonHelper {
  public static getPersonAddress(address: PersonAddress): string {
    if (!address) {
      return '';
    }

    const result: string[] = [];

    result.push(address.street ? `вул. ${address.street.name}` : null);
    result.push(address.house);

    if (address.houseSection) {
      result.push(`корп. ${address.houseSection}`)
    }

    if (address.apartment) {
      result.push(`кв. ${address.apartment}`);
    }

    return _.compact(result).join(', ');
  }
}
