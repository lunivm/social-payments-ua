import bcrypt from 'bcryptjs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import { LoginResponse } from '../../../api-contracts/login-response';
import { User } from '../../../api-contracts/user/user';
import { HttpError } from '../core/http-error';
import { Token } from '../core/token';
import { UserModel } from '../models/user/user.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const token = _.get(req, 'headers.authorization', '').replace('Bearer ', '');

  if (!token) {
    const error = new HttpError('');
    error.status = 400;
    next(error);
  }

  Token.isExpired(token)
    .then((expired) => res.send({expired}));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const {login, password} = req.body;
  const token = Token.getToken(login);

  UserModel.findOneAndUpdate({login}, {token}, (err, user: User) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.send(<LoginResponse> {
        authorized: true,
        token
      });
    } else {
      next(err || {status: 401} as any);
    }
  });
});

export const loginRouter = router;