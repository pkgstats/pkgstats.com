import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import gravatar from 'gravatar';
import ReactMarkdown from 'react-markdown/with-html';
import Link from 'components/base/Link';
import PackageGraph from 'components/packages/PackageGraph';
import PackageGrid from 'components/packages/PackageGrid';
import { fetchDownloads } from 'store/actions/DownloadsActions';
import { fetchPackage } from 'store/actions/PackageActions';

const uriTransformer = require('react-markdown').uriTransformer;

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
  padding: 5rem 2rem;

  .details__header {
    font-size: 1.8rem;
    border-top: 0.3rem solid #222;
    padding-top: 2rem;
  }

  .details__section + .details__section {
    margin-top: 5rem;
  }

  .details__readme__src {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
    line-height: 1.7;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 5rem 0 3rem;
    }

    h2 {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #333;
    }

    hr {
      border: 0;
      border-top: 1px solid #333;
      margin: 5rem 0;
    }

    img {
      max-width: 100%;
    }
  }

  .details__maintainers {
    .maintainer-link {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      text-decoration: none;
    }

    .maintainer-link__image {
      width: 5rem;
      margin-right: 1.5rem;
      border-radius: 0.2rem;
    }

    .maintainer-link + .maintainer-link {
      margin-top: 2rem;
    }
  }

  .details__keywords {
    a {
      display: inline-block;
      font-size: 1.4rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      margin-right: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      border-radius: 0.2rem;
      transition: border-color 0.2s ease-in-out;
    }

    a:active,
    a:hover {
      border-color: #666;
    }
  }

  @media all and (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .details--main {
      flex-basis: 70%;
      width: 70%;
    }

    .details--side {
      flex-basis: 28%;
      width: 28%;
    }
  }
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

  constructor(props) {
    super(props);

    this.parseTransformLinkUri = this.parseTransformLinkUri.bind(this);
  }

  parseTransformLinkUri(uri) {
    uri = uriTransformer(uri);
    const slashIndex = uri.indexOf('\/\/');

    if (slashIndex >= 0 && slashIndex <= 6) {
      return uri;
    }

    const {
      pkg,
    } = this.props;

    const readmeOrigin = pkg.homepage.indexOf('#') > -1
      ? pkg.homepage.substring(0, pkg.homepage.indexOf('#'))
      : pkg.homepage;

    return `${readmeOrigin}/blob/master/${uri}${uri.indexOf('?') !== -1 ? '&ref=pkgstats.com' : '?ref=pkgstats.com'}`;
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
      <Link route={`/?search=${keyword}`} key={`package-keywords-${pkg.name}-${keyword}`}>
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
      <Link
        route={`/@${maintainer.name}`}
        key={`package-maintainers-${pkg.name}-${maintainer.name}`}
      >
        <a className="maintainer-link">
          {maintainer.email && <img className="maintainer-link__image" src={gravatar.url(maintainer.email)} />}
          <span className="maintainer-link__name">{maintainer.name}</span>
        </a>
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
        <Head>
          <title>{`${pkg.name} on PkgStats - npm package discovery and stats viewer.`}</title>
          <meta name="description" content={pkg.description} />
          {pkg.keywords && <meta name="keywords" content={pkg.keywords.join(', ')} />}
        </Head>
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
          <div className="details--side">
            <div className="details__section details__maintainers">
              <h3 className="details__header">Maintainers</h3>
              {this.renderMaintainers()}
            </div>
            <div className="details__section details__keywords">
              <h3 className="details__header">Keywords</h3>
              {this.renderKeywords()}
            </div>
          </div>
          <div className="details--main">
            <div className="details__readme">
              <h3 className="details__header">Readme</h3>
              <ReactMarkdown
                className="details__readme__src"
                source={pkg.readme}
                linkTarget="_blank"
                escapeHtml={false}
                transformLinkUri={this.parseTransformLinkUri}
              />
            </div>
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
