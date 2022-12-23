import { useState, useEffect } from 'react';

import { CommentEntity } from '@gb-news-blog/entities';
import { getNickName } from '../../utils';

export interface CommentProps {
  comment: CommentEntity;
  onEdit?: (comment: CommentEntity) => void;
  onDelete?: (id: number) => void;
}

export function Comment({ comment, onEdit, onDelete }: CommentProps) {
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    setNickName(getNickName(comment.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{nickName}</p>
      <p>{comment.message}</p>
      <button
        onClick={() => {
          if (onEdit) {
            onEdit(comment);
          }
        }}
      >
        EDIT
      </button>
      <button
        onClick={() => {
          if (onDelete) {
            onDelete(comment.id);
          }
        }}
      >
        DELETE
      </button>
    </div>
  );

  // return <h1>Welcome to Comment!</h1>;
}

export default Comment;
