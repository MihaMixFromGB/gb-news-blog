import { UserEntity } from '@gb-news-blog/entities';
import { CreateUserDto } from '@gb-news-blog/dto';

const API_URL = `${process.env.NX_API_URL}/api/auth`;

// const DEFAULT_USER: UserEntity = {
//   id: 1,
//   email: 'batman@gmail.com',
//   password: '',
//   role: 'user',
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

export async function getCurrentUser(): Promise<UserEntity | null> {
  return fetch(`${API_URL}/session`, {
    mode: 'cors',
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return null;
  });
}

export async function signup(
  params: CreateUserDto
): Promise<UserEntity | null> {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return null;
  });
}

export async function login(params: CreateUserDto): Promise<UserEntity | null> {
  return fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    mode: 'cors',
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return null;
  });
}

export async function logout(): Promise<void> {
  // fetch(`${API_URL}/session`, {
  //   method: 'DELETE',
  // });
}
