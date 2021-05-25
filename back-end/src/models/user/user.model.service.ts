import bcrypt from 'bcryptjs';
import { Types } from "mongoose";
import { User } from 'api-contracts/user/user';
import { MongoosePromise } from '../mongoose-promise';
import { UserModel } from './user.model';

export class UserModelService {
  public static getAll(): MongoosePromise<UserModel[]> {
    return UserModel
      .find()
      .select('login fullName isAdmin');
  }

  public static create(user: User): Promise<UserModel> {
    return UserModel
      .create(Object.assign(user, {
        _id: new Types.ObjectId(),
        created: Date.now(),
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync())
      })
    );
  }

  public static update(id: string, user: User): MongoosePromise<UserModel> {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
    } else {
      delete user.password;
    }
    delete user._id;

    return UserModel
      .findByIdAndUpdate(id, user);
  }

  public static remove(id: string): MongoosePromise<UserModel> {
    return UserModel
      .findByIdAndRemove(id)
  }

  public static findByToken(token: string): MongoosePromise<UserModel> {
    return UserModel.findOne({token})
  }

  public static isAdmin(token: string): Promise<boolean> {
    return UserModel.findOne({token})
      .then((user: UserModel) => user.isAdmin);
  }
}
