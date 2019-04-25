import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PackageGrid from 'components/packages/PackageGrid';
import { searchNpm } from 'store/actions/SearchNpmActions';

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

    this.onFetchMore = this.onFetchMore.bind(this);
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
    } = this.props;

    return (
      <main className="app-view app-view--home">
        <PackageGrid
          items={packages.objects}
          total={packages.total}
          onFetchMore={this.onFetchMore}
        />
      </main>
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
