import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import PackageGrid from 'components/packages/PackageGrid';
import UserInfo from 'components/users/UserInfo';

import { searchNpm } from 'store/actions/SearchNpmActions';
import { fetchUser } from 'store/actions/UserActions';

const ViewWrapper = styled.main`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${props => props.packages.objects.length ? 'flex-start' : 'center'};
  align-items: ${props => props.packages.objects.length ? 'flex-start' : 'center'};
  width: 100%;
`;

const EmptyResults = styled.p`
  font-size: 1.6rem;
  text-align: center;
  color: #999;
  width: 100%;

  em {
    font-style: normal;
    color: white;
  }
`;

class User extends Component {
  static async getInitialProps({ query, store }) {
    const {
      username,
    } = query;

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
  }

  constructor(props) {
    super(props);

    this.onFetchMore = this.onFetchMore.bind(this);
  }

  onFetchMore() {
    const {
      actions,
      packages,
      router,
    } = this.props;

    if (packages.fetching || !packages.objects || !packages.objects.length) {
      return;
    }

    actions.searchNpm(`maintainer:${router.query.username}`, {
      skip: packages.objects.length,
    });
  }

  render() {
    const {
      packages,
      router,
      user,
    } = this.props;

    return (
      <ViewWrapper className="app-view app-view--home" packages={packages}>
        <Head>
          <title>{`${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`}</title>
          <meta name="description" content={`Explore ${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta property="og:title" content={`${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta property="og:description" content={`Explore ${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta property="og:image" content={`https://pkgstats.linkcards.io/${encodeURIComponent(`https://www.pkgstats.com/share/${router.asPath}`)}.jpg`} />
          <meta name="twitter:title" content={`${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta name="twitter:description" content={`Explore ${router.query.username}’s packages on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta name="twitter:image" content={`https://pkgstats.linkcards.io/${encodeURIComponent(`https://www.pkgstats.com/share/${router.asPath}`)}.jpg`} />
        </Head>
        <UserInfo user={user} />
        {!!packages.objects.length && (
          <PackageGrid
            items={packages.objects}
            total={packages.total}
            onFetchMore={this.onFetchMore}
          />
        )}
        {!!(!packages.fetching && !packages.objects.length) && (
          <EmptyResults>
            <span>No packages found for user: </span>
            <em>{router.query.username}</em>
          </EmptyResults>
        )}
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    searches,
    users,
  } = state;

  const {
    router,
  } = props;

  const username = router.query.username;
  const searchKey = `text:maintainer:${username}`;

  const user = users.items[username];
  const packages = searches.hasOwnProperty(searchKey)
    ? searches[searchKey]
    : { fetching: true, objects: [], total: 0 };

  return {
    packages,
    user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      searchNpm,
      fetchUser,
    }, dispatch),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(User));
