import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  // it('should render successfully', async () => {
  //   const { baseElement } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   expect(baseElement).toBeTruthy();
  // });

  it('should have a greeting as the title', () => {
    const { findByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(findByText(/News Blog/gi)).toBeTruthy();
  });
});
