import { useState, useEffect } from 'react';

import { NewsEntity } from '@gb-news-blog/entities';
import ShortNews from '../short-news/short-news';

export function NewsList() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);

  useEffect(() => {
    fetch(`${process.env.NX_API_URL}/api/news`)
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.log('err from NewsList', err));
  }, []);

  return (
    <div>
      {newsList.length !== 0 && (
        <ul>
          {newsList.map((item) => (
            <li key={item.id}>
              <ShortNews news={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsList;
