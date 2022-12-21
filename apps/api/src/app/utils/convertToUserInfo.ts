import { User, UserInfo } from '@gb-news-blog/interfaces';

export function convertToUserInfo(user: User): UserInfo {
  return (({ id, firstName, lastName, email, avatar }) => ({
    id,
    firstName,
    lastName,
    email,
    avatar,
  }))(user);
}
