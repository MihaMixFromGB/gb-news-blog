import { useMemo } from 'react';

import { NewsEntity } from '@gb-news-blog/entities';
import { TimeAgo } from '../../../components/TimeAgo';
import { getNickName } from '../../../services/UserInfo';

/* eslint-disable-next-line */
export interface ShortInfoProps {
  news: NewsEntity;
}

export function ShortNews({ news }: ShortInfoProps) {
  const imagesSrc = `${process.env.NX_API_URL}/images`;
  const nickname = useMemo(() => getNickName(news.author), [news.author]);
  const shortDecription = useMemo(() => {
    const description = news.description;
    if (description.length > 20) {
      return news.description.substring(0, 50) + '...';
    }
    return description;
  }, [news.description]);

  return (
    <div>
      {news.cover && (
        <img src={`${imagesSrc}/${news.cover}`} alt={news.title} />
      )}
      <h1>{news.title}</h1>
      <p>Author: {nickname}</p>
      <p>Created: {<TimeAgo timestamp={news.createdAt.toString()} />}</p>
      <p>{shortDecription}</p>
    </div>
  );
}

export default ShortNews;
