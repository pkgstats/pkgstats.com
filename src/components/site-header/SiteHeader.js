import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'components/base/Link';
import Router from 'components/base/Router';
import GlobalSearch from './GlobalSearch';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;

  .site-header__logo__link {
    text-decoration: none;
  }

  .site-header__logo__type {
    font-family: var(--font-family-mono);
    font-size: 1.6rem;
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

class SiteHeader extends Component {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(text = '') {

    console.debug('onSearchChange', text);

    if (text !== '') {
      Router.pushRoute(`/?search=${text}`);
      return;
    }

    Router.pushRoute('/');
  }

  render() {
    return (
      <Header>
        <div className="site-header__logo">
          <Link route="/">
            <a className="site-header__logo__link">
              <h1 className="site-header__logo__type">pkg stats</h1>
            </a>
          </Link>
        </div>
        <div className="site-header__nav">
          <nav>
            <Link route="/@ryanhefner">
              <a>Users</a>
            </Link>
            <Link route="/pkg/react-contentful">
              <a>Packages</a>
            </Link>
            <Link route="/org/playnice">
              <a>Organizations</a>
            </Link>
          </nav>
        </div>
        <GlobalSearch onChange={this.onSearchChange} />
      </Header>
    );
  }
}

export default SiteHeader;
