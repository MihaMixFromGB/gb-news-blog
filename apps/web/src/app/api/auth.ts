import { UserEntity } from '@gb-news-blog/entities';
import { CreateUserDto } from '@gb-news-blog/dto';

const API_URL = `${process.env.NX_API_URL}/api/auth`;

const DEFAULT_USER: UserEntity = {
  id: 1,
  email: 'batman@gmail.com',
  password: '',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function getCurrentUser(): Promise<UserEntity | null> {
  // const res = await fetch(API_URL);

  // return res.json();
  // return DEFAULT_USER;
  return null;
}

export async function signUp(params: CreateUserDto): Promise<UserEntity> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return res.json();
}

export async function login(params: CreateUserDto): Promise<UserEntity> {
  const res = await fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return res.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/session`, {
    method: 'DELETE',
  });
}
