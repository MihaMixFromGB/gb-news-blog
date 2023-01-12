import { render } from '@testing-library/react';

import ShortNews from './shortNews';
import { NewsEntity } from '@gb-news-blog/entities';
import { CategoryEntity } from '@gb-news-blog/entities';
import { UserEntity } from '@gb-news-blog/entities';

describe('ShortNews', () => {
  const testNews: NewsEntity = {
    id: 1,
    title: 'Fake News',
    description: 'Fake Description',
    category: {} as CategoryEntity,
    author: {
      email: 'test@email.com',
    } as UserEntity,
    createdAt: '2023-01-01 00:00',
    updatedAt: '2023-01-01 00:00',
  };

  it('should render successfully', () => {
    const { baseElement } = render(<ShortNews news={testNews} />);
    expect(baseElement).toBeTruthy();
  });
});
