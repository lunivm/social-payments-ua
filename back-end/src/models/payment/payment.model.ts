import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Payment } from 'api-contracts/payment/payment';
import { financialInstitutionSchema } from '../financial-institution/financial-institution.model';
import { personSchemaFields } from '../person/person.model';
import { streetSchema } from '../street/street.model';

const paymentPersonSchemaFields = Object.assign({}, personSchemaFields);
paymentPersonSchemaFields.address.street = streetSchema as any;

const paymentSchema = new Schema({
  created: {
    type: Date,
    required: [true]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true]
  },
  sum: {
    type: Number,
    required: [true],
    min: [0.01]
  },
  accountNumber: String,
  codeKFK: {
    type: String,
    required: true
  },
  codeKEK: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true]
  },
  financialInstitution: financialInstitutionSchema,
  person: new Schema(paymentPersonSchemaFields),
  reportNumber: {
    type: String,
    required: true
  },
  paid: Boolean
});

paymentSchema.index(
  {
    description: 'text'
  },
  {
    name: 'paymentDescriptionIndex'
  }
);

export type PaymentModel = Payment & Document & {author: number};

export const PaymentModel = model<PaymentModel>('Payment', paymentSchema);

PaymentModel.on('index', function (err) {
  if (err) {
    console.log('PaymentModel index error: %s', err);
  } else {
    console.log('PaymentModel indexing complete');
  }
});
