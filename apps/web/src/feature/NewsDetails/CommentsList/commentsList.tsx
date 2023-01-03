import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';
import { SocketEventPayload } from '@gb-news-blog/socket-events-types';

import useAuth from '../../../hooks/useAuth';
import useSocket from '../../../hooks/useSocket';
import {
  getCommentsForNews,
  createComment,
  editComment,
  deleteComment,
} from '../../../services/Api/comments';
import { Comment } from './Comment';
import { SocketAlert } from '../../../components/SocketAlert';

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
  const [socketMessage, setSocketMessage] = useState('');
  const [socketReceivedAt, setSocketReceivedAt] = useState(new Date());

  const { newsId } = useParams();
  const { user } = useAuth();
  const socket = useSocket();

  const handleSocketAlert = useCallback((data: SocketEventPayload) => {
    setSocketMessage(data.message);
    setSocketReceivedAt(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = parseInt(newsId || '');
    if (!id) {
      return;
    }

    getCommentsForNews(id).then((data) => setComments(data));
  }, [newsId]);

  useEffect(() => {
    socket.emit('room-join', { newsId });

    socket.on('comment-create', handleSocketAlert);
    socket.on('comment-edited', handleSocketAlert);
    socket.on('comment-deleted', handleSocketAlert);

    return () => {
      socket.off('comment-create');
      socket.off('comment-edited');
      socket.off('comment-deleted');
      socket.emit('room-leave', { newsId });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsId, socket]);

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
  };

  const onEdit = (comment: CommentEntity) => {
    setMessage(comment.message);
    setIsCreate(false);
    setEditedComment({ ...comment });
    document.getElementById('commentInput')?.focus();
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
    <section className="sm:w-1/2 w-full mx-auto py-5">
      <div className="max-w-2xl px-4">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <textarea
            id="commentInput"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          ></textarea>
        </div>
        <button
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-200 hover:bg-indigo-800"
          onClick={isCreate ? handleCreateBtn : handleEditeBtn}
        >
          {isCreate ? 'Post' : 'Edit'} comment
        </button>
      </div>
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <Comment comment={item} onEdit={onEdit} onDelete={onDelete} />
          </li>
        ))}
      </ul>
      <SocketAlert message={socketMessage} receivedAt={socketReceivedAt} />
    </section>
  );
}

export default CommentsList;
