import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Person } from 'api-contracts/person/person';

export const personSchemaFields = {
  fullName: {
    type: String,
    required: [true]
  },
  passportNumber: {
    type: String,
    required: [true]
  },
  identityCode: String,
  address: {
    street: {
      type: Schema.Types.ObjectId,
      ref: 'Street',
      required: true
    },
    house: {
      type: String,
      required: [true]
    },
    houseSection: String,
    apartment: String
  }
};

export type PersonModel = Person & Document;

export const PersonModel = model<PersonModel>('Person', new Schema(personSchemaFields), 'persons');

