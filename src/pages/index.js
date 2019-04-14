import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PackageGrid from 'components/packages/PackageGrid';
import { searchNpm } from 'store/actions/SearchNpmActions';

class Index extends Component {
  static async getInitialProps({ store }) {
    const {
      searches,
    } = store.getState();

    if (!searches['popularity:1-text:react']) {
      await store.dispatch(searchNpm('react', {
        popularity: 1
      }));
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

  const searchKey = 'popularity:1-text:react';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
