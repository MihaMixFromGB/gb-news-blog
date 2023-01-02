import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { NewsEntity } from '@gb-news-blog/entities';
import { getNews } from '../../../services/Api/news';
import { TimeAgo } from '../../../components/TimeAgo';
import { getNickName } from '../../../services/UserInfo';

export function FullNews() {
  const [news, setNews] = useState<NewsEntity | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [nickname, setNickname] = useState('');
  const { newsId } = useParams();

  useEffect(() => {
    const id = parseInt(newsId || '');
    if (!id) {
      return;
    }

    getNews(id).then((data) => {
      setNews(data);
      if (!data) {
        return;
      }
      setImgSrc(`${process.env.NX_API_URL}/images/${data.cover}`);
      setNickname(getNickName(data.author));
    });
  }, [newsId]);

  return (
    news && (
      <div className="flex flex-col items-center">
        <img
          className="w-2/3 min-w-[360px] h-96 object-cover"
          src={imgSrc}
          alt={news.title}
        />
        <h2 className="text-gray-900 text-xl font-medium mb-2">{news.title}</h2>
        <p className="text-gray-600 text-xs">Author: {nickname}</p>
        <p className="text-gray-600 text-xs">
          Created:{<TimeAgo timestamp={news.createdAt.toString()} />}
        </p>
        <p className="self-start text-gray-700 text-base mb-4">
          {news.description}
        </p>
      </div>
    )
  );
}

export default FullNews;
