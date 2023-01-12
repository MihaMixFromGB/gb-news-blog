import { render } from '@testing-library/react';

import TimeAgo from './timeAgo';

describe('TimeAgo', () => {
  const timestamp = '2023-01-01 00:00';
  it('should render successfully', () => {
    const { baseElement } = render(<TimeAgo timestamp={timestamp} />);
    expect(baseElement).toBeTruthy();
  });
});
