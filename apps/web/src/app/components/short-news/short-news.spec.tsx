import { render } from '@testing-library/react';

import ShortNews from './short-news';

describe('ShortNews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShortNews />);
    expect(baseElement).toBeTruthy();
  });
});
