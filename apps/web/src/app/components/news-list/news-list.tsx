import { useState, useEffect } from 'react';

import { NewsEntity } from '@gb-news-blog/entities';
import ShortNews from '../short-news/short-news';
import { getAllNews } from '../../api/news';

export function NewsList() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);

  useEffect(() => {
    getAllNews().then((data) => setNewsList(data));
  }, []);

  return (
    <div>
      {newsList.length !== 0 && (
        <ul>
          {newsList.map((item) => (
            <li key={item.id}>
              <ShortNews news={item} />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsList;
