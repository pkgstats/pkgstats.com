import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'components/base/Link';
import Router from 'components/base/Router';
import GlobalSearch from './GlobalSearch';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-black);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .site-header__logo__link {
    display: block;
    text-decoration: none;
    padding: 1rem;
    background-color: var(--color-white);
    color: var(--color-black);
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

  @media all and (min-width: 768px) {
    .site-header__logo__link {
      padding: 2rem;
    }
  }
`;

const checkUser = (value) => {
  return /@(.*)/.exec(value);
};

const checkPackage = (value) => {
  return /pkg:(.*)/.exec(value);
};

class SiteHeader extends Component {
  constructor(props) {
    super(props);

    this.searchTimeout = null;
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setRoute(route) {
    Router.pushRoute(route);
  }

  onSearchChange(text = '') {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (text !== '') {
        const packageCheck = checkPackage(text);
        if (packageCheck) {
          this.setRoute(`/pkg:${packageCheck[1]}`);
          return;
        }

        const userCheck = checkUser(text);
        if (userCheck) {
          this.setRoute(`/@${userCheck[1]}`);
          return;
        }

        this.setRoute(`/?search=${text}`);
        return;
      }

      this.setRoute('/');
    }, 1000);
  }

  render() {
    const {
      search,
    } = this.props;

    return (
      <Header>
        <div className="site-header__logo">
          <Link route="/">
            <a className="site-header__logo__link">
              <h1 className="site-header__logo__type">pkg stats</h1>
            </a>
          </Link>
        </div>
        {/*
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
        */}
        <GlobalSearch
          search={search}
          onChange={this.onSearchChange}
        />
      </Header>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    router,
  } = props;

  const userCheck = checkUser(router.asPath.substring(1));
  const packageCheck = checkPackage(router.asPath.substring(1));

  console.log(router);

  const search = router.query.search
    ? router.query.search
    : router.pathname !== '/'
      ? (userCheck && `@${userCheck[1]}`) || (packageCheck && `pkg:${packageCheck[1]}`)
      : '';

  return {
    search,
  };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(SiteHeader));
