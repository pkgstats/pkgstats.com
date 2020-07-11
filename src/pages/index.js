import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import PackageGrid from 'components/packages/PackageGrid';
import { searchNpm } from 'store/actions/SearchNpmActions';

const ViewWrapper = styled.main`
  flex-direction: row;
  justify-content: ${props => props.packages.objects.length ? 'stretch' : 'center'};
  align-items: ${props => props.packages.objects.length ? 'flex-start' : 'center'};
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

class Index extends Component {
  static async getInitialProps({ query, store }) {
    const {
      searches,
    } = store.getState();

    const searchTerm = query.search || 'react';

    if (!searches[`popularity:1-text:${searchTerm}`]) {
      await store.dispatch(searchNpm(searchTerm, {
        popularity: 1,
      }));
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      consoleLogged: false,
    };

    this.onFetchMore = this.onFetchMore.bind(this);
  }

  logConsole() {
    if (typeof window === undefined || this.state.consoleLogged) {
      return;
    }

    const pkgStats = `%c
           __              __        __
    ____  / /______ ______/ /_____ _/ /______
   / __ \\/ //_/ __ \`/ ___/ __/ __ \`/ __/ ___/
  / /_/ / ,< / /_/ (__  ) /_/ /_/ / /_(__  )
 / .___/_/|_|\\__, /____/\\__/\\__,_/\\__/____/
/_/         /____/
`;
    console.log(pkgStats, 'font-family:monospace;');
    console.log(`%c— npm package discovery and stats viewer.`, 'font-family:monospace;');
    console.log(`%cWelcome, 👋, you’re my kind of people.`, 'font-family:monospace;');
    console.log(`%cIf you like this, you might like my other app, https://optimizetoolset.com.`, 'font-family:monospace;');

    this.setState({
      consoleLogged: true,
    });
  }

  onFetchMore() {
    const {
      actions,
      packages,
      search,
    } = this.props;

    if (packages.fetching || !packages.objects || !packages.objects.length) {
      return;
    }

    actions.searchNpm(search, {
      popularity: 1,
      skip: packages.objects.length,
    });
  }

  render() {
    const {
      packages,
      search,
    } = this.props;

    this.logConsole();

    return (
      <ViewWrapper className="app-view app-view--home" packages={packages}>
        <Head>
          <title>Pkg Stats - npm package discovery and stats viewer.</title>
          <meta name="description" key="description" content="Quickly browse and discover the best packages on npm for your next project or application." />
          <meta name="keywords" key="keywords" content="npm, packages, repository, discovery, statistics, browse, search" />
        </Head>
        {!!packages.objects.length && (
          <PackageGrid
            items={packages.objects}
            total={packages.total}
            onFetchMore={this.onFetchMore}
          />
        )}
        {!!(!packages.fetching && !packages.objects.length) && (
          <EmptyResults>
            <span>No results found for: </span>
            <em>{search}</em>
          </EmptyResults>
        )}
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    searches,
  } = state;

  const {
    router,
  } = props;

  const search = router.query.search || 'react';
  const searchKey = `popularity:1-text:${search}`;

  const packages = searches.hasOwnProperty(searchKey)
    ? searches[searchKey]
    : { fetching: true, objects: [], total: 0 };

  return {
    packages,
    search,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      searchNpm,
    }, dispatch),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Index));
