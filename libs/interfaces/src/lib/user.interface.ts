export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
