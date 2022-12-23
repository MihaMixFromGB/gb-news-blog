import { NewsEntity } from '@gb-news-blog/entities';

const API_URL = `${process.env.NX_API_URL}/api/news`;

export async function getAllNews(): Promise<NewsEntity[]> {
  return fetch(API_URL).then((res) => res.json());
}

export async function getNews(id: number): Promise<NewsEntity> {
  return fetch(`${API_URL}/${id}`).then((res) => res.json());
}
