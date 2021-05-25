import bcrypt from 'bcryptjs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import { LoginResponse } from 'api-contracts/login/login-response';
import { User } from 'api-contracts/user/user';
import { HttpError } from '../core/http-error';
import { Token } from '../core/token/token';
import { TokenInfo } from '../core/token/token-info';
import { UserModel } from '../models/user/user.model';

const router = express.Router();

// todo: rewrite wih controller

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const token = Token.extractFromRequest(req);

  if (!token) {
    const error = new HttpError('');
    error.status = 400;
    next(error);
  }

  Token.isValid(token)
    .then((info: TokenInfo) => res.send({isValid: info.isValid}));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const {login, password} = req.body;
  const token = Token.createToken(login);

  UserModel.findOneAndUpdate({login}, {token}, (err, user: User) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const loginResponse: LoginResponse = {
        authorized: true,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        token
      };

      res.send(loginResponse);
    } else {
      next(err || {status: 401} as any);
    }
  });
});

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  const token = _.get(req, 'headers.authorization', '').replace('Bearer ', '');

  UserModel.findOneAndUpdate({token}, {token: null}, () => res.end());
});

export const loginRouter = router;