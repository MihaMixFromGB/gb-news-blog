import { User } from './user.interface';

export type UserInfo = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'avatar'
>;
