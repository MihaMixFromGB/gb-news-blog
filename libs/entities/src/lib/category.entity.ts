import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Category } from '@gb-news-blog/interfaces';

@Entity('categories')
export class CategoryEntity implements Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
