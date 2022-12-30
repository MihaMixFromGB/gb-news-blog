import { render } from '@testing-library/react';

import NewsDetails from './newsDetails';

describe('NewsDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsDetails />);
    expect(baseElement).toBeTruthy();
  });
});
