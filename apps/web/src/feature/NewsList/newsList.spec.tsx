import { render } from '@testing-library/react';

import NewsList from './newsList';

describe('NewsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsList />);
    expect(baseElement).toBeTruthy();
  });
});
