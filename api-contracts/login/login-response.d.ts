export interface LoginResponse {
  authorized: boolean;
  token: string;
  fullName: string;
  isAdmin?: boolean;
}
