import { render } from '@testing-library/react';

import FullNews from './full-news';

describe('FullNews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullNews />);
    expect(baseElement).toBeTruthy();
  });
});
