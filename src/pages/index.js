import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PackageGrid from 'components/packages/PackageGrid';
import { fetchUserPackages } from 'store/actions/PackageActions';

class Index extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchUserPackages('ryanhefner'));
  }

  renderPackages() {
    const {
      packages,
    } = this.props;

    return packages.items.map(item => (
      <div
        className="package-item"
        key={`package-item-${item.package.name}`}
      >
        <h3 className="package-item__name">{item.package.name}</h3>
      </div>
    ));
  }

  render() {
    const {
      packages,
    } = this.props;

    return (
      <main className="app-view app-view--home">
        <PackageGrid items={packages.items} />
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    packages,
  } = state;

  return {
    packages,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      fetchUserPackages,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
