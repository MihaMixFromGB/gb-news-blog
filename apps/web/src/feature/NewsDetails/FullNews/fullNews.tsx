import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { NewsEntity } from '@gb-news-blog/entities';
import { getNews } from '../../../services/Api/news';

export function FullNews() {
  const [news, setNews] = useState<NewsEntity | null>(null);
  const { newsId } = useParams();

  useEffect(() => {
    const id = parseInt(newsId || '');
    if (!id) {
      return;
    }

    getNews(id).then((data) => setNews(data));
  }, [newsId]);

  return (
    news && (
      <div>
        <h1>{news.title}</h1>
        <p>{news.description}</p>
      </div>
    )
  );
}

export default FullNews;
