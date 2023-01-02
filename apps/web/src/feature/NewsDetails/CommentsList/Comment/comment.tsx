import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { CommentEntity } from '@gb-news-blog/entities';
import { getNickName } from '../../../../services/UserInfo';

export interface CommentProps {
  comment: CommentEntity;
  onEdit?: (comment: CommentEntity) => void;
  onDelete?: (id: number) => void;
}

export function Comment({ comment, onEdit, onDelete }: CommentProps) {
  const [nickName, setNickName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const { user } = comment;
    setNickName(getNickName(user));
    setImgSrc(`${process.env.NX_API_URL}/images/${user.avatar}`);
    setCreatedAt(format(new Date(comment.createdAt), 'dd.MM.yyyy'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="group px-6 my-6 text-base bg-white rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={imgSrc}
              alt={nickName}
            />
            {nickName}
          </p>
          <p className="text-sm text-gray-600">
            <time title={createdAt}>{createdAt}</time>
          </p>
        </div>
        <div className="invisible group-hover:visible">
          <button
            className="mr-2 hover:bg-indigo-200 rounded-full p-2"
            onClick={() => {
              if (onEdit) {
                onEdit(comment);
              }
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <button
            className="hover:bg-indigo-200 rounded-full p-2"
            onClick={() => {
              if (onDelete) {
                onDelete(comment.id);
              }
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </footer>
      <p className="text-gray-500">{comment.message}</p>
    </article>
  );
}

export default Comment;
