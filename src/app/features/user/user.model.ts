export interface UserModel {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;

  readonly image?: string;
}
