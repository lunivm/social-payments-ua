import { LoginCheckResponse } from 'api-contracts/login/login-check-response';
import { User } from 'api-contracts/user/user';

export interface TokenInfo extends LoginCheckResponse {
  isValid: boolean;
  user: User;
}
