import { MongoosePromise } from '../mongoose-promise';
import { CodeKFKModel } from './code-kfk.model';
import { uniqueFieldMongoErrorCode } from '../unique-field-error-code.const';
import { clientBroadcastService } from '../../services/client-broadcast.service';

export class CodeKFKModelService {
  public static add(code: string): MongoosePromise<void> {
    return CodeKFKModel.create({code})
      .then((codeKfk: CodeKFKModel) => {
        clientBroadcastService.broadcastClients({
          channel: 'code-kfk',
          action: 'create',
          payload: codeKfk.toObject()
        });
      })
      .catch((err) => {
        if (err && err.code === uniqueFieldMongoErrorCode) {
          return;
        } else {
          throw err;
        }
      });
  }

  public static getAll(): MongoosePromise<CodeKFKModel[]> {
    return CodeKFKModel
      .find()
      .sort('code')
  }
}
