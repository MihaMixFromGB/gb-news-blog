export interface Comment {
  id: number;
  parentId?: number;
  message: string;
  newsId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
