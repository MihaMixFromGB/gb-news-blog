import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';
// import { SocketEventPayload } from '@gb-news-blog/socket-events-types';

import useAuth from '../../hooks/useAuth';
// import useSocket from '../../hooks/useSocket';
import {
  getCommentsForNews,
  createComment,
  editComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../comment/comment';

// function cbTestSocket(data: SocketEventPayload) {
//   console.log('socket data', data);
// }

export function CommentsList() {
  const [comments, setComments] = useState<CommentEntity[]>([]);
  const [editedComment, setEditedComment] = useState<CommentEntity | null>(
    null
  );
  const [message, setMessage] = useState('');
  const [isCreate, setIsCreate] = useState(true);

  const { newsId } = useParams();
  const { user } = useAuth();
  // const socket = useSocket();

  useEffect(() => {
    const id = parseInt(newsId || '');
    if (!id) {
      return;
    }

    getCommentsForNews(id).then((data) => setComments(data));
  }, [newsId]);

  // useEffect(() => {
  //   socket.emit('room-join', { newsId });

  //   socket.on('comment-create', cbTestSocket);
  //   socket.on('comment-edited', cbTestSocket);
  //   socket.on('comment-deleted', cbTestSocket);

  //   return () => {
  //     socket.off('comment-create');
  //     socket.off('comment-edited');
  //     socket.off('comment-deleted');
  //     socket.emit('room-leave', { newsId });
  //   };
  // }, [newsId, socket]);

  const handleCreateBtn = async () => {
    const commentDto: CommentDto = {
      newsId: parseInt(newsId || ''),
      userId: user?.id || 0,
      message,
    };

    await createComment(commentDto)
      .then((newComment) => {
        if (!newComment) {
          return Promise.reject('A comment has not been created!');
        }

        const newComments = [...comments];
        newComments.push(newComment);
        setComments(newComments);
        setMessage('');
      })
      .catch((err) =>
        console.log('comments-list > handleCreated', err.message)
      );

    // socket.emit('comment-create', { data: commentDto });
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
        if (!eComment) {
          return Promise.reject(
            `A comment (id=${editedComment.id}) has not been edited!`
          );
        }

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
      .catch((err) => console.log('comments-list > handleEdited', err));
  };

  const onDelete = async (id: number) => {
    await deleteComment(id)
      .then((dComment) => {
        if (!dComment) {
          return Promise.reject(`A comment (id=${id}) has not been deleted!`);
        }
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
