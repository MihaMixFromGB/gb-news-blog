import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { News } from '@gb-news-blog/interfaces';
import { UserInfo } from '@gb-news-blog/interfaces';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';
import { CommentEntity } from './comment.entity';

@Entity('news')
export class NewsEntity implements Omit<News, 'authorId' | 'categoryId'> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  cover?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category!: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  author!: UserInfo;

  @OneToMany(() => CommentEntity, (comment) => comment.id)
  comments!: CommentEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
