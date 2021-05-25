import {
  Document,
  model,
  Schema
} from 'mongoose';
import { User } from 'api-contracts/user/user';
import { addUserModelMiddleware } from './user.model.middleware';

const userSchema = new Schema({
  login: {
    type: String,
    required: [true],
    unique: true
  },
  fullName: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  },
  token: String,
  isAdmin: Boolean,
  created: {
    type: Date,
    required: [true]
  }
});

addUserModelMiddleware(userSchema);

export type UserModel = User & Document & {
  token: string
};

export const UserModel = model<UserModel>('User', userSchema);

