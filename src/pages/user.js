import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PackageGrid from 'components/packages/PackageGrid';
import { searchNpm } from 'store/actions/SearchNpmActions';

class User extends Component {
  static async getInitialProps({ query, store }) {
    const {
      username,
    } = query;

    const {
      searches,
    } = store.getState();

    if (!searches[`text:maintainer:${username}`]) {
      await store.dispatch(searchNpm(`maintainer:${username}`));
    }
  }

  render() {
    const {
      packages,
    } = this.props;

    return (
      <main className="app-view app-view--home">
        <PackageGrid items={packages} />
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

  const searchKey = `text:maintainer:${router.query.username}`;

  const packages = searches.hasOwnProperty(searchKey)
    ? searches[searchKey].objects
    : [];

  return {
    packages,
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
)(User));
