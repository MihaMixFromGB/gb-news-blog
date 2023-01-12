import { render, screen, waitFor } from '@testing-library/react';

import NewsList from './newsList';
import { getAllNews } from '../../services/Api/news';
import { NewsEntity } from '@gb-news-blog/entities';
import { CategoryEntity } from '@gb-news-blog/entities';
import { UserEntity } from '@gb-news-blog/entities';

jest.mock('../../services/Api/news');
const mockGetAllNews = getAllNews as jest.Mock;

describe('NewsList', () => {
  it('should render successfully', () => {
    mockGetAllNews.mockImplementation(() => Promise.resolve([]));

    const { baseElement } = render(<NewsList />);
    // Wrap in waitFor() to fix the "not wrapped in act(...)" warning
    // because there needs to resolve a promise in component
    waitFor(() => expect(baseElement).toBeTruthy());
  });

  it('should render a test news', () => {
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
    mockGetAllNews.mockImplementation(() => Promise.resolve([testNews]));

    render(<NewsList />);

    waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1));
  });
});
