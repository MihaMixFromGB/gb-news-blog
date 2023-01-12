import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Header from './header';
import * as useAuth from '../../hooks/useAuth';
import { UserEntity } from '@gb-news-blog/entities';

describe('Header (unauthorized user)', () => {
  const loginLink = /log\s?in/i;
  const signupLink = /sign\s?up/i;
  const loginPath = '/login';
  const signupPath = '/signup';

  beforeEach(() => {
    jest.spyOn(useAuth, 'default').mockImplementation(() => ({
      user: null,
      loading: false,
      error: '',
      login: jest.fn(),
      signup: jest.fn(),
      logout: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Header />, { wrapper: BrowserRouter });
    expect(baseElement).toBeInTheDocument();
  });

  it('should render menu with two items: login and signup', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText(loginLink)).toBeInTheDocument();
    expect(screen.getByText(signupLink)).toBeInTheDocument();
  });

  it('should route login link to "/login"', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(loginLink)).toHaveAttribute('href', loginPath);
  });

  it('should route signup link to "/signup"', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(signupLink)).toHaveAttribute('href', signupPath);
  });
});

describe('Header (authorized user)', () => {
  const logoutBtn = /log\s?out/i;
  const loginLink = /log\s?in/i;
  const signupLink = /sign\s?up/i;

  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.spyOn(useAuth, 'default').mockImplementation(() => ({
      user: {} as UserEntity,
      loading: false,
      error: '',
      login: jest.fn(),
      signup: jest.fn(),
      logout: mockLogout,
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Header />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });

  it('should render a logout button', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(logoutBtn)).toBeInTheDocument();
  });

  it('should not render login and signup links', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.queryByText(loginLink)).not.toBeInTheDocument();
    expect(screen.queryByText(signupLink)).not.toBeInTheDocument();
  });

  it('should call logout() from context by clicking button', async () => {
    const user = userEvent.setup();

    render(<Header />, { wrapper: BrowserRouter });
    await user.click(screen.getByText(logoutBtn));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
