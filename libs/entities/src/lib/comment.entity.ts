import {
  Entity,
  Tree,
  TreeParent,
  TreeChildren,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Comment } from '@gb-news-blog/interfaces';
import { UserInfo } from '@gb-news-blog/interfaces';
import { UserEntity } from './user.entity';

@Entity('comments')
@Tree('materialized-path')
export class CommentEntity implements Omit<Comment, 'parentId' | 'userId'> {
  @PrimaryGeneratedColumn()
  id!: number;

  @TreeParent()
  parent?: CommentEntity;

  @TreeChildren()
  children?: CommentEntity[];

  @Column()
  message!: string;

  @Column()
  newsId!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user!: UserInfo;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
