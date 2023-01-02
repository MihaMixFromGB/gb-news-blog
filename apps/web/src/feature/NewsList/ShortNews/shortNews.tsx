import { useMemo } from 'react';

import { NewsEntity } from '@gb-news-blog/entities';
import { TimeAgo } from '../../../components/TimeAgo';
import { getNickName } from '../../../services/UserInfo';

/* eslint-disable-next-line */
export interface ShortInfoProps {
  news: NewsEntity;
}

export function ShortNews({ news }: ShortInfoProps) {
  const newsLink = `/news/${news.id}`;
  const imgSrc = `${process.env.NX_API_URL}/images`;
  const nickname = useMemo(() => getNickName(news.author), [news.author]);
  const shortDecription = useMemo(() => {
    const description = news.description;
    if (description.length > 100) {
      return news.description.substring(0, 100) + '...';
    }
    return description;
  }, [news.description]);

  return (
    <div className="sm:min-w-full min-w-[360px] h-full rounded-lg shadow-lg bg-white max-w-sm transition duration-500 hover:scale-105">
      {news.cover && (
        <a href={newsLink}>
          <img
            className="rounded-t-lg h-56 w-full object-cover"
            src={`${imgSrc}/${news.cover}`}
            alt={news.title}
          />
        </a>
      )}
      <div className="p-4">
        <a href={newsLink}>
          <h2 className="text-gray-900 text-xl font-medium mb-2">
            {news.title}
          </h2>
        </a>
        <p className="text-gray-600 text-xs">Author: {nickname}</p>
        <p className="text-gray-600 text-xs">
          Created:{<TimeAgo timestamp={news.createdAt.toString()} />}
        </p>
        <p className=" text-gray-700 text-base mb-4">{shortDecription}</p>
      </div>
    </div>
  );
}

export default ShortNews;
