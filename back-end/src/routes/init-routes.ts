import { Express } from 'express-serve-static-core';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Token } from '../core/token/token';
import { TokenInfo } from '../core/token/token-info';
import { apiRouter } from './api/api';
import { loginRouter } from './login';
import { reportsRouter } from './reports/reports';

export function initRoutes(app: Express) {
  // Bearer token authentication
  passport.use(new BearerStrategy((token: string, done: (error: any, user?: any) => void) => {
    Token.isValid(token)
      .then((tokenInfo: TokenInfo) => tokenInfo.isValid ? done(null, tokenInfo.user) : done(null, false));
    })
  );


  // no authentication routes
  app.use('/login', loginRouter);

  // routes with authentication
  app.use('/generated-reports', passport.authenticate('bearer', { session: false }), reportsRouter);
  app.use('/api', passport.authenticate('bearer', { session: false }), apiRouter);
}
