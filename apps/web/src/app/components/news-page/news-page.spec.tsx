import { render } from '@testing-library/react';

import NewsPage from './news-page';

describe('NewsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsPage />);
    expect(baseElement).toBeTruthy();
  });
});
