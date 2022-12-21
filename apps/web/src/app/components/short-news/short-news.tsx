import { NewsEntity } from '@gb-news-blog/entities';

/* eslint-disable-next-line */
export interface ShortNewsProps {
  news: NewsEntity;
}

export function ShortNews({ news }: ShortNewsProps) {
  return (
    <div>
      <h1>{news.title}</h1>
    </div>
  );
}

export default ShortNews;
