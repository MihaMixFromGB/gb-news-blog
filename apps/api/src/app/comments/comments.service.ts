import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';

import { UsersService } from '../users/users.service';
import { User } from '@gb-news-blog/interfaces';
import { convertToUserInfo } from '../utils/convertToUserInfo';

import { EmitterEventDto } from '@gb-news-blog/emitter-events-types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: TreeRepository<CommentEntity>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2
  ) {}

  async findAllByNews(newsId: number): Promise<CommentEntity[]> {
    const comments: CommentEntity[] = [];

    const rootComments = (
      await this.commentsRepository.findRoots({ relations: ['user'] })
    )
      .filter((item) => item.newsId === newsId)
      .sort(this.compareComments);

    for (const comment of rootComments) {
      const orderedComments = await this.convertTreeToArray(comment);
      comments.push(...orderedComments);
    }

    return comments.map((comment) => {
      comment.user = convertToUserInfo(comment.user as User);
      return comment;
    });
  }

  async findById(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    comment.user = convertToUserInfo(comment.user as User);

    return comment;
  }

  async create(commentDto: CommentDto): Promise<CommentEntity | null> {
    let newComment = new CommentEntity();

    const user = await this.usersService.findById(commentDto.userId);
    if (!user) {
      return null;
    }

    if (commentDto.parentId) {
      newComment.parent = await this.findById(commentDto.parentId);
    }

    newComment = {
      ...newComment,
      ...commentDto,
      user,
    };

    newComment = await this.commentsRepository.save(newComment);
    newComment.user = convertToUserInfo(newComment.user as User);

    this.eventEmitter.emit(
      'comment.create',
      new EmitterEventDto('comment-create', newComment.newsId.toString(), {
        entityId: newComment.id,
        userId: newComment.user.id,
        message: `${newComment.user.email} has created a new message`,
      })
    );

    return newComment;
  }

  async update(
    id: number,
    commentDto: CommentDto
  ): Promise<CommentEntity | null> {
    const user = await this.usersService.findById(commentDto.userId);
    if (!user) {
      return null;
    }

    let updatedComment = await this.findById(id);
    if (!updatedComment) {
      return null;
    }

    updatedComment = {
      ...updatedComment,
      ...commentDto,
      user,
    };

    updatedComment = await this.commentsRepository.save(updatedComment);
    updatedComment.user = convertToUserInfo(updatedComment.user as User);

    this.eventEmitter.emit(
      'comment.edited',
      new EmitterEventDto('comment-edited', updatedComment.newsId.toString(), {
        entityId: updatedComment.id,
        userId: updatedComment.user.id,
        message: `${updatedComment.user.email} has edited a message`,
      })
    );

    return updatedComment;
  }

  async remove(id: number): Promise<CommentEntity | null> {
    let deletedComment = await this.findById(id);
    if (!deletedComment) {
      return null;
    }

    deletedComment = await this.commentsRepository.remove(deletedComment);
    deletedComment.user = convertToUserInfo(deletedComment.user as User);

    this.eventEmitter.emit(
      'comment.deleted',
      new EmitterEventDto('comment-deleted', deletedComment.newsId.toString(), {
        entityId: deletedComment.id,
        userId: deletedComment.user.id,
        message: `${deletedComment.user.email} has deleted a message`,
      })
    );

    return deletedComment;
  }

  async removeAllByNews(newsId: number): Promise<CommentEntity[]> {
    let commentsByNews = await this.findAllByNews(newsId);
    if (!commentsByNews.length) {
      return [];
    }

    commentsByNews = await this.commentsRepository.remove(commentsByNews);

    return commentsByNews.map((comment) => {
      comment.user = convertToUserInfo(comment.user as User);
      return comment;
    });
  }

  private compareComments(item1: CommentEntity, item2: CommentEntity) {
    return (
      new Date(item1.createdAt).getTime() - new Date(item2.createdAt).getTime()
    );
  }

  private async convertTreeToArray(
    parent: CommentEntity,
    arr?: CommentEntity[]
  ): Promise<CommentEntity[]> {
    arr = arr || [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _children, ..._parent } = parent;
    arr.push(_parent);

    const commentsTree = await this.commentsRepository.findDescendantsTree(
      parent,
      {
        depth: 1,
        relations: ['user'],
      }
    );

    const children = commentsTree.children.sort(this.compareComments);

    for (const comment of children) {
      await this.convertTreeToArray(comment, arr);
    }

    return arr;
  }
}
