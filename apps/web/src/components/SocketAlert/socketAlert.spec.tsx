import { render } from '@testing-library/react';

import SocketAlert from './socketAlert';

describe('SocketAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocketAlert />);
    expect(baseElement).toBeTruthy();
  });
});
