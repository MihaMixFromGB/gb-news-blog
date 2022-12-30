import { NewsEntity } from '@gb-news-blog/entities';

const API_URL = `${process.env.NX_API_URL}/api/news`;

export async function getAllNews(): Promise<NewsEntity[]> {
  return fetch(API_URL, { credentials: 'include' }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return [];
  });
}

export async function getNews(id: number): Promise<NewsEntity | null> {
  return fetch(`${API_URL}/${id}`, { credentials: 'include' }).then((res) => {
    if (res.ok) {
      res.json();
    }
    return null;
  });
}
