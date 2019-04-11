import React from 'react';
import styled from 'styled-components';
import Link from 'components/base/Link';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;

  .site-header__logo__link {
    text-decoration: none;
  }

  .site-header__logo__type {
    font-size: 2rem;
    margin: 0;
  }

  .site-header__nav a {
    display: inline-block;
    font-size: 1.6rem;
    text-decoration: none;
  }

  .site-header__nav a + a {
    margin-left: 2rem;
  }
`;

export default () => (
  <Header>
    <div className="site-header__logo">
      <Link to="/">
        <a className="site-header__logo__link">
          <h1 className="site-header__logo__type">Pkg Stats</h1>
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
