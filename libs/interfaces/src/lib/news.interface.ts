export interface News {
  id: number;
  title: string;
  description: string;
  authorId: number;
  cover?: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
}
