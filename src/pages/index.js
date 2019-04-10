import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserPackages } from 'store/actions/PackageActions';

class Index extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchUserPackages('ryanhefner'));
  }

  renderPackages() {
    const {
      packages,
    } = this.props;

    console.debug(packages);

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

    return (
      <main className="app-view app-view--home">
        {this.renderPackages()}
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
