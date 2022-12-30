import { render } from '@testing-library/react';

import FullNews from './fullNews';

describe('FullNews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullNews />);
    expect(baseElement).toBeTruthy();
  });
});
