import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import PackageGraph from 'components/packages/PackageGraph';

import { searchNpm } from 'store/actions/SearchNpmActions';
import { fetchUser } from 'store/actions/UserActions';
import { fetchDownloads } from 'store/actions/DownloadsActions';
import { fetchPackage } from 'store/actions/PackageActions';
import { fetchReadme } from 'store/actions/ReadmeActions';

const ViewWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 4rem 5rem 5rem;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.3rem solid #222;
  padding-bottom: 3rem;
`;

const HeaderPrimary = styled.h1`
  font-family: var(--font-family-mono);
  font-size: 6vh;
  margin: 0;
`;

const HeaderSecondary = styled.a`
  font-size: 6vh;
  text-decoration: none;
`;

const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentCopy = styled.p`
  font-size: 12vh;
  margin: 0;
`;

const GraphHolder = styled.div`
  .graph__info {
    padding: 0 0 3rem;
  }

  .graph__info__label {
    font-size: 5vh;
    color: #999;
    margin: 0;
    margin-bottom: 1rem;
  }

  .graph__info__data {
    font-family: var(--font-family-mono);
    font-size: 7vh;
    margin: 0;
  }
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 66.66%;

  .user__image {
    width: 20rem;
    margin-right: 2rem;
  }

  .user__name {
    font-size: 7vh;
  }
`;

const UserStats = styled.div`
  flex-basis: 33.33%;

  h3 {
    font-size: 5vh;
    color: #999;
    margin: 0;
    margin-bottom: 1rem;
  }

  h4 {
    font-family: var(--font-family-mono);
    font-size: 10vh;
    margin: 0;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
  border-top: 0.2rem solid #222;
`;

const FooterLink = styled.a`
  font-size: 5vh;
  text-decoration: none;
  color: #999;
`;

class Share extends Component {
  static async getInitialProps({ query, store }) {
    let pageType;
    let headerCopy;

    if (/@/.test(query[0])) {
      const username = query[0].replace('@', '');

      const {
        searches,
        users,
      } = store.getState();

      if (!searches[`text:maintainer:${username}`]) {
        await store.dispatch(searchNpm(`maintainer:${username}`));
      }

      if (!users[username]) {
        await store.dispatch(fetchUser(username));
      }

      pageType = 'user';
      headerCopy = query[0];
    }
    else if (/pkg:/.test(query[0])) {
      const pkg = query[0].replace('pkg:', '');

      const {
        packages,
        downloads,
      } = store.getState();

      if (!packages[pkg]) {
        await store.dispatch(fetchPackage(pkg));
      }

      const downloadsKey = `packages:${pkg}:type:range:timeframe:last-month`;
      if (!downloads[downloadsKey]) {
        await store.dispatch(fetchDownloads(pkg));
      }

      pageType = 'pkg';
      headerCopy = pkg;
    }

    return {
      headerCopy,
      pageType,
    };
  }

  renderPackageGraph() {
    const {
      pkgDownloads,
    } = this.props;

    if (!pkgDownloads || !pkgDownloads.response) {
      return null;
    }

    const data = pkgDownloads.response.downloads.map(item => item.downloads);
    const labels = pkgDownloads.response.downloads.map(item => item.day);
    const downloads = data.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return (
      <GraphHolder>
        <div className="graph__info">
          <p className="graph__info__label">Monthly Downloads</p>
          <p className="graph__info__data">{downloads.toLocaleString()}</p>
        </div>
        <PackageGraph
          data={data}
          label="Downloads"
          labels={labels}
        />
      </GraphHolder>
    );
  }

  renderUserInfo() {
    const {
      packages,
      user,
    } = this.props;

    return (
      <UserContent>
        <UserInfo>
          <img src={user.avatar} className="user__image" />
          <h2 className="user__name">{user.name}</h2>
        </UserInfo>
        <UserStats>
          <h3>Packages</h3>
          <h4>{packages.total}</h4>
        </UserStats>
      </UserContent>
    );
  }

  renderContent() {
    const {
      headerCopy,
      pageType,
    } = this.props;

    switch (pageType) {
      case 'pkg':
        return this.renderPackageGraph();

      case 'user':
        return this.renderUserInfo();

      default:
        return (
          <ContentCopy>
            Quickly browse and discover the best packages on npm.
          </ContentCopy>
        );
    }
  }

  render() {
    const {
      headerCopy,
      pageType,
    } = this.props;

    return (
      <ViewWrapper>
        <Header>
          <HeaderPrimary>Pkg Stats</HeaderPrimary>
          {headerCopy && (
            <HeaderSecondary href={pageType === 'user' ? `/${headerCopy}` : `/pkg:${headerCopy}`}>
              {headerCopy}
            </HeaderSecondary>
          )}
        </Header>
        <Content>
          {this.renderContent()}
        </Content>
        <Footer>
          <FooterLink href="https://pkgstats.com">pkgstats.com</FooterLink>
          <FooterLink href="https://twitter.com/pkgstats" target="_blank" rol="nofollow noreferrer noopener">@pkgstats</FooterLink>
        </Footer>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    downloads,
    packages,
    searches,
    users,
  } = state;

  const {
    pageType,
    router,
  } = props;

  if (pageType === 'pkg') {
    const pkgName = router.query[0].replace('pkg:', '');
    const pkg = packages[pkgName];

    const downloadsKey = `packages:${pkgName}:type:range:timeframe:last-month`;
    const pkgDownloads = downloads[downloadsKey];

    return {
      pkg,
      pkgDownloads,
    };
  }

  if (pageType === 'user') {
    const username = router.query[0].replace('@', '');
    const searchKey = `text:maintainer:${username}`;

    const user = users.items[username];
    const packages = searches.hasOwnProperty(searchKey)
      ? searches[searchKey]
      : { fetching: true, objects: [], total: 0 };

    return {
      packages,
      user,
    };
  }

  return {};
};

export default withRouter(connect(
  mapStateToProps,
  null
)(Share));
