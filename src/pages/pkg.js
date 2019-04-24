import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'components/base/Link';
import PackageGraph from 'components/packages/PackageGraph';
import PackageGrid from 'components/packages/PackageGrid';
import { fetchDownloads } from 'store/actions/DownloadsActions';
import { fetchPackage } from 'store/actions/PackageActions';

const HeaderInfo = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5rem 2rem 0;

  .header-info__name {
    font-size: 2.8rem;
  }

  .header-info__version {
    display: inline-block;
    font-family: var(--font-family-mono);
    font-size: 2.4rem;
    padding: 0.5rem 2rem;
    border: 1px solid #222;
    border-radius: 0.2rem;
  }
`;

const InfoSection = styled.section`
  padding: 0 2rem 5rem;

  .info__desc {
    font-size: 1.8rem;
  }

  .info__install {
    font-family: var(--font-family-mono);
    font-size: 1.6rem;
  }

  @media all and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const GraphSection = styled.section`

`;

const GraphHolder = styled.div`
  .graph__info {
    padding: 0 2rem 3rem;
  }

  .graph__info__label {
    font-size: 1.4rem;
    color: #999;
    margin: 0;
    margin-bottom: 1rem;
  }

  .graph__info__data {
    font-family: var(--font-family-mono);
    font-size: 2.4rem;
    margin: 0;
  }
`;

const DetailsSection = styled.section`

`;


class Pkg extends Component {
  static async getInitialProps({ query, store }) {
    const {
      pkg,
    } = query;

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
          <p className="graph__info__label">Downloads</p>
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

  renderKeywords() {
    const {
      pkg,
    } = this.props;

    if (!pkg || !pkg.keywords) {
      return null;
    }

    return pkg.keywords.map(keyword => (
      <Link route={`/keyword/${keyword}`} key={`package-keywords-${pkg.name}-${keyword}`}>
        <a>{keyword}</a>
      </Link>
    ));
  }

  renderMaintainers() {
    const {
      pkg,
    } = this.props;

    if (!pkg || !pkg.maintainers) {
      return null;
    }

    return pkg.maintainers.map(maintainer => (
      <Link route={`/@${maintainer.name}`} key={`package-maintainers-${pkg.name}-${maintainer.name}`}>
        <a>{maintainer.name}</a>
      </Link>
    ));
  }

  render() {
    const {
      pkg,
      pkgDownloads,
    } = this.props;

    return (
      <main className="app-view app-view--user">
        <HeaderInfo>
          <div className="header-info__basic">
            <h1 className="header-info__name">{pkg.name}</h1>
          </div>
          {pkg['dist-tags'] && (
            <div className="header-info__status">
              <h2 className="header-info__version">{`v${pkg['dist-tags'].latest}`}</h2>
            </div>
          )}
        </HeaderInfo>
        <InfoSection>
          <p className="info__desc">{pkg.description}</p>
          <p className="info__install">{`npm i ${pkg.name}`}</p>
        </InfoSection>
        <GraphSection>
          {this.renderPackageGraph()}
        </GraphSection>
        <DetailsSection>
          <div className="header-info__maintainers">
            {this.renderMaintainers()}
          </div>
          <div className="package-view__keywords">
            {this.renderKeywords()}
          </div>
        </DetailsSection>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    downloads,
    packages,
  } = state;

  const {
    router,
  } = props;

  const pkg = packages[router.query.pkg];

  const downloadsKey = `packages:${router.query.pkg}:type:range:timeframe:last-month`;
  const pkgDownloads = downloads[downloadsKey];

  return {
    pkg,
    pkgDownloads,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      fetchPackage,
    }, dispatch),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Pkg));
