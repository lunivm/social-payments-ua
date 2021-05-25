import { Person } from 'api-contracts/person/person';
import { clientBroadcastService } from '../../services/client-broadcast.service';
import { MongoosePromise } from '../mongoose-promise';
import { PersonModel } from './person.model';

export class  PersonModelService {
  public static resolve (person: Person): Promise<Person | PersonModel> {
    if (person._id) {
      return Promise.resolve(person);
    }

    return PersonModel.find({
      passportNumber: person.passportNumber,
      fullName: person.fullName
    })
      .then((persons: PersonModel[]) => {
        if (persons.length) {
          return Promise.resolve(persons[0]);
        } else {
          delete person._id;
          return PersonModel
            .create(person)
            .then((person: PersonModel) => {
              return PersonModel.findById(person.id)
                .populate('address.street');
            })
            .then((person: PersonModel) => {
              clientBroadcastService.broadcastClients({
                channel: 'person',
                action: 'create',
                payload: person.toObject()
              });

              return person;
            });
        }
      });
  }

  public static getAll(): MongoosePromise<PersonModel[]> {
    return PersonModel
      .find()
      .populate('address.street')
  }
}

