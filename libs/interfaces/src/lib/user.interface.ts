export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
