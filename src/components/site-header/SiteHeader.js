import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../routes';

const Header = styled.header`
  dislay: flex;
  justify-content: space-between;
  padding: 2rem;

  .site-header__logo__link {
    text-decoration: none;
  }

  .site-header__logo__type {
    font-size: 2rem;
    margin: 0;
  }
`;

export default () => (
  <Header>
    <div className="site-header__logo">
      <Link to="/">
        <a className="site-header__logo__link">
          <h1 className="site-header__logo__type">PkgStats</h1>
        </a>
      </Link>
    </div>
    <div className="site-header__nav">
      <nav>
        <Link to="/@ryanhefner">
          <a>Users</a>
        </Link>
        <Link to="/pkg/react-contentful">
          <a>Packages</a>
        </Link>
        <Link to="/org/playnice">
          <a>Organizations</a>
        </Link>
      </nav>
    </div>
  </Header>
);
