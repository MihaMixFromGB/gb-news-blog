import { render } from '@testing-library/react';

import CommentsList from './commentsList';

describe('CommentsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentsList />);
    expect(baseElement).toBeTruthy();
  });
});
