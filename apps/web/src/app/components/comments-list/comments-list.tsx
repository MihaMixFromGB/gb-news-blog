import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';
import {
  getCommentsForNews,
  createComment,
  editComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../comment/comment';

export function CommentsList() {
  const [comments, setComments] = useState<CommentEntity[]>([]);
  const [editedComment, setEditedComment] = useState<CommentEntity | null>(
    null
  );
  const [message, setMessage] = useState('');
  const [isCreate, setIsCreate] = useState(true);

  const { newsId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const id = parseInt(newsId || '');
    if (!id) {
      return;
    }

    getCommentsForNews(id).then((data) => setComments(data));
  }, [newsId]);

  const handleCreateBtn = async () => {
    const commentDto: CommentDto = {
      newsId: parseInt(newsId || ''),
      userId: user?.id || 0,
      message,
    };

    await createComment(commentDto)
      .then((newComment) => {
        const newComments = [...comments];
        newComments.push(newComment);
        setComments(newComments);
      })
      .catch((err) =>
        console.log('comments-list > handleCreated', err.message)
      );
  };

  const onEdit = (comment: CommentEntity) => {
    setMessage(comment.message);
    setIsCreate(false);
    setEditedComment({ ...comment });
  };

  const handleEditeBtn = async () => {
    if (!editedComment) {
      return;
    }

    const commentDto: CommentDto = {
      newsId: parseInt(newsId || ''),
      userId: user?.id || 0,
      message,
    };

    if (editedComment.parent) {
      commentDto.parentId = editedComment.parent.id;
    }

    await editComment(editedComment.id, commentDto)
      .then((eComment) => {
        const updatedComments = [...comments];
        const idx = updatedComments.findIndex(
          (item) => item.id === eComment.id
        );
        if (idx !== -1) {
          updatedComments[idx] = { ...eComment };
          setComments(updatedComments);
          setEditedComment(null);
          setMessage('');
          setIsCreate(true);
        }
      })
      .catch((err) => console.log('comments-list > handleEdited', err.message));
  };

  const onDelete = async (id: number) => {
    await deleteComment(id)
      .then((dComment) => {
        setComments(comments.filter((item) => item.id !== id));
      })
      .catch((err) => console.log('comments-list > OnDelete', err.message));
  };

  return (
    <div>
      <h1>Welcome to CommentsList!</h1>
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <Comment comment={item} onEdit={onEdit} onDelete={onDelete} />
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={isCreate ? handleCreateBtn : handleEditeBtn}>
          {isCreate ? 'CREATE' : 'EDIT'}
        </button>
      </div>
    </div>
  );
}

export default CommentsList;
