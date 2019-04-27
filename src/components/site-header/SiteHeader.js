import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'components/base/Link';
import Router from 'components/base/Router';
import InfoPanel from './InfoPanel';
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
  height: 6rem;

  .site-header__logo__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    padding: 1rem;
    background-color: var(--color-white);
    color: var(--color-black);
    height: 6rem;
  }

  .site-header__logo__type {
    font-family: var(--font-family-mono);
    font-size: 1.6rem;
    margin: 0;
  }

  @media all and (min-width: 768px) {
    .site-header__logo__link {
      padding: 2rem;

      br {
        display: none;
      }
    }
  }
`;

const InfoButton = styled.button`
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  // font-style: italic;
  color: #000;
  background-color: #999;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 2rem;
  margin-left: 2rem;
  transition: background-color 0.2s ease-in-out;

  &:active,
  &:hover {
    background-color: #fff;
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

    this.state = {
      showPanel: false,
    };

    this.searchInput = null;

    this.setSearchInput = element => {
      this.searchInput = element;
    };

    this.searchTimeout = null;
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
    this.onPanelDismiss = this.onPanelDismiss.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      router,
    } = this.props;

    const {
      query,
      asPath,
    } = router;

    const queryValue = query && query.search
      ? query.search
      : asPath.substring(1);

    if (this.searchInput.value !== queryValue) {
      this.searchInput.value = queryValue || '';
    }

    if (this.state.showPanel && asPath !== prevProps.router.asPath) {
      this.setState({
        showPanel: false,
      });
    }
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

  onInfoButtonClick() {
    this.setState({
      showPanel: true,
    });
  }

  onPanelDismiss() {
    this.setState({
      showPanel: false,
    });
  }

  render() {
    const {
      search,
    } = this.props;

    const {
      showPanel,
    } = this.state;

    return (
      <Header>
        <div className="site-header__logo">
          <Link route="/">
            <a className="site-header__logo__link">
              <h1 className="site-header__logo__type">pkg <br />stats</h1>
            </a>
          </Link>
        </div>
        <GlobalSearch
          forwardedRef={this.setSearchInput}
          search={search}
          onChange={this.onSearchChange}
        />
        <InfoButton onClick={this.onInfoButtonClick}>?</InfoButton>
        <InfoPanel show={showPanel} onDismiss={this.onPanelDismiss} />
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

  const search = router.query.search
    ? router.query.search
    : router.pathname !== '/'
      ? userCheck
        ? `@${userCheck[1]}`
        : packageCheck
          ? `pkg:${packageCheck[1]}`
          : ''
      : '';

  return {
    search,
  };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(SiteHeader));
