import { CommentDto } from '@gb-news-blog/dto';
import { CommentEntity } from '@gb-news-blog/entities';

const API_URL = `${process.env.NX_API_URL}/api/comments`;

export async function getCommentsForNews(
  newsId: number
): Promise<CommentEntity[]> {
  return fetch(`${API_URL}?newsId=${newsId}`).then((res) => res.json());
}

export async function createComment(
  commentDto: CommentDto
): Promise<CommentEntity> {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentDto),
  }).then((res) => res.json());
}

export async function editComment(
  id: number,
  commentDto: CommentDto
): Promise<CommentEntity> {
  return fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentDto),
  }).then((res) => res.json());
}

export async function deleteComment(id: number): Promise<CommentEntity> {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
}
