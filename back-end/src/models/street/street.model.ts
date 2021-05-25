import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Street } from 'api-contracts/street/street';

export const streetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: String
});

export type StreetModel = Street & Document;

export const StreetModel = model<StreetModel>('Street', streetSchema);
