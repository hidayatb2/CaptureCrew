import { UserRole } from '../enums/user-role';

export class LoginResponse {
  Id!: string;
  Name!: string;
  Email!: string;
  ContactNo!: string;
  User!: UserRole;
  token!: string;
}
