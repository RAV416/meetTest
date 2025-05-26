export interface UserModel {
  readonly id?: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly image?: string;
  readonly role?: string;
}
