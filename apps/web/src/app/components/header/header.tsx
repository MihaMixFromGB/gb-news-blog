import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div>
      <h1>Welcome to Header!</h1>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
