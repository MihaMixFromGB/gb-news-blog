import { UserInfo } from '@gb-news-blog/interfaces';

export function getNickName(user: UserInfo): string {
  const { firstName, lastName, email } = user;
  return firstName && lastName ? `${firstName} ${lastName}` : email;
}
