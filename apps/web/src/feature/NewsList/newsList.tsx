import { useState, useEffect } from 'react';

import { NewsEntity } from '@gb-news-blog/entities';
import { ShortNews } from './ShortNews';
import { getAllNews } from '../../services/Api/news';

export function NewsList() {
  const [newsList, setNewsList] = useState<NewsEntity[]>([]);

  useEffect(() => {
    getAllNews().then((data) => setNewsList(data));
  }, []);

  return (
    <div className="container mx-auto my-5">
      {newsList.length !== 0 && (
        <ul className="flex flex-row justify-center gap-5 flex-wrap">
          {newsList.map((item) => (
            <li className="md:w-5/12" key={item.id}>
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
