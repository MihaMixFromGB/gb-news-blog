import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className="border-b border-indigo-200">
      <div className="container mx-auto flex flex-row justify-between items-center p-2">
        <div>
          <Link to="/">
            <img src="/favicon.ico" alt="logo" />
          </Link>
        </div>
        <div className="text-3xl font-bold text-indigo-900 uppercase">
          <h1>News Blog</h1>
        </div>
        <div role="navigation">
          {!user && (
            <ul className="flex flex-row items-center">
              <li className="text-indigo-800 mr-3 hover:opacity-70">
                <Link to="/login">Log in</Link>
              </li>
              <li className="text-indigo-800 border border-indigo-800 rounded-lg p-1 hover:opacity-70">
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          )}
          {user && (
            <button
              className="text-indigo-800 mr-3 hover:opacity-70 outline-0"
              onClick={() => {
                logout();
              }}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
