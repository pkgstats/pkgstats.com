import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import gravatar from 'gravatar';
import ReactMarkdown from 'react-markdown/with-html';
import parseRepositoryURL from '@hutson/parse-repository-url';

import Link from 'components/base/Link';
import CopyButton from 'components/packages/CopyButton';
import PackageGraph from 'components/packages/PackageGraph';
import PackageGrid from 'components/packages/PackageGrid';

import { fetchDownloads } from 'store/actions/DownloadsActions';
import { fetchPackage } from 'store/actions/PackageActions';
import { fetchReadme } from 'store/actions/ReadmeActions';

import * as Styled from 'components/page-styles/pkg.styled';

const uriTransformer = require('react-markdown').uriTransformer;

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

    if (packages[pkg] && packages[pkg].readme === '') {
      await store.dispatch(fetchReadme(pkg));
    }
  }

  constructor(props) {
    super(props);

    this.parseTransformLinkUri = this.parseTransformLinkUri.bind(this);
  }

  componentDidMount() {
    const {
      pkg,
    } = this.props;

    if (pkg && pkg.readme === '') {
      this.requestReadme();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      pkg,
    } = this.props;

    if (pkg && prevProps.pkg.name !== pkg.name && pkg.readme === '') {
      this.requestReadme();
    }
  }

  requestReadme() {
    const {
      actions,
      pkg,
    } = this.props;

    actions.fetchReadme(pkg);
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
      <Styled.GraphHolder>
        <div className="graph__info">
          <p className="graph__info__label">Downloads</p>
          <p className="graph__info__data">{downloads.toLocaleString()}</p>
        </div>
        <PackageGraph
          data={data}
          label="Downloads"
          labels={labels}
        />
      </Styled.GraphHolder>
    );
  }

  renderLinks() {
    const {
      pkg,
    } = this.props;

    const links = [];

    ['npm', 'repository', 'homepage'].forEach(linkType => {
      if (linkType === 'npm' || pkg.hasOwnProperty(linkType)) {
        let linkString = linkType;
        let linkUrl = `https://npmjs.com/package/${pkg.name}?ref=pkgstats.com`;

        switch (linkType) {
          case 'npm':
            linkString = <svg viewBox="0 0 780 250"><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>;
            break;

          case 'repository':
            linkUrl = `${parseRepositoryURL(pkg.repository.url).browse()}?ref=pkgstats.com`;
            linkString = <svg viewBox="0 0 92 92" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Git</title><g stroke="none"><path d="M90.155,41.965 L50.036,1.847 C47.726,-0.464 43.979,-0.464 41.667,1.847 L33.336,10.179 L43.904,20.747 C46.36,19.917 49.176,20.474 51.133,22.431 C53.102,24.401 53.654,27.241 52.803,29.706 L62.989,39.891 C65.454,39.041 68.295,39.59 70.264,41.562 C73.014,44.311 73.014,48.768 70.264,51.519 C67.512,54.271 63.056,54.271 60.303,51.519 C58.235,49.449 57.723,46.409 58.772,43.861 L49.272,34.362 L49.272,59.358 C49.942,59.69 50.575,60.133 51.133,60.69 C53.883,63.44 53.883,67.896 51.133,70.65 C48.383,73.399 43.924,73.399 41.176,70.65 C38.426,67.896 38.426,63.44 41.176,60.69 C41.856,60.011 42.643,59.497 43.483,59.153 L43.483,33.925 C42.643,33.582 41.858,33.072 41.176,32.389 C39.093,30.307 38.592,27.249 39.661,24.691 L29.243,14.271 L1.733,41.779 C-0.578,44.092 -0.578,47.839 1.733,50.15 L41.854,90.268 C44.164,92.578 47.91,92.578 50.223,90.268 L90.155,50.336 C92.466,48.025 92.466,44.275 90.155,41.965"></path></g></svg>;
            break;

          default:
            linkUrl = pkg.homepage.indexOf('#')
              ? pkg.homepage.split('#').join('?ref=pkgstats.com#')
              : `${pkg.homepage}${pkg.homepage.indexOf('?') !== -1 ? '&' : '?'}ref=pkgstats.com`;
            linkString = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
            break;
        }

        links.push((
          <a
            href={linkUrl}
            className={`package-link package-link--${linkType}`}
            key={`package-link-${pkg.name}-${linkType}`}
            target="_blank"
            rel="noreferrer noopener"
            title={linkType}
          >{linkString}</a>
        ));
      }
    });

    return links;
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
      readme,
      router,
    } = this.props;

    if (!pkg) {
      return null;
    }

    if (pkg.error) {
      return (
        <main className="app-view app-view--pkg">
          <Styled.EmptyWrapper>
            <Styled.EmptyResults>
              <span>No package found for: </span>
              <em>{router.query.pkg}</em>
            </Styled.EmptyResults>
          </Styled.EmptyWrapper>
        </main>
      );
    }

    return (
      <main className="app-view app-view--pkg">
        <Head>
          <title>{`${pkg.name} on Pkg Stats - npm package discovery and stats viewer.`}</title>
          <meta name="description" key="description" content={pkg.description} />
          {pkg.keywords && <meta name="keywords" key="keywords" content={pkg.keywords.join(', ')} />}
          <meta property="og:url" key="og:url" content={`https://www.pkgstats.com${router.asPath}`} />
          <meta property="og:title" key="og:title" content={`${pkg.name} on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta property="og:description" key="og:description" content={pkg.description} />
          <meta property="og:image" key="og:image" content={`https://pkgstats.linkcards.io/${encodeURIComponent(`https://www.pkgstats.com/share/${router.asPath.replace('/', '')}`)}.jpg?url=https://www.pkgstats.com${router.asPath}`} />
          <meta name="twitter:title" key="twitter:title" content={`${pkg.name} on Pkg Stats - npm package discovery and stats viewer.`} />
          <meta name="twitter:description" key="twitter:description" content={pkg.description} />
          <meta name="twitter:image" key="twitter:image" content={`https://pkgstats.linkcards.io/${encodeURIComponent(`https://www.pkgstats.com/share/${router.asPath.replace('/', '')}`)}.jpg?url=https://www.pkgstats.com${router.asPath}`} />
        </Head>
        <Styled.HeaderInfo>
          <div className="header-info__basic">
            <h1 className="header-info__name">{pkg.name}</h1>
          </div>
          {pkg['dist-tags'] && (
            <div className="header-info__status">
              <h2 className="header-info__version">{`v${pkg['dist-tags'].latest}`}</h2>
            </div>
          )}
        </Styled.HeaderInfo>
        <Styled.InfoSection>
          <p className="info__desc">{pkg.description}</p>
          <CopyButton className="info__install__button" target="#install-script">
            <span id="install-script" className="info__install">{`npm i ${pkg.name}`}</span>
          </CopyButton>
        </Styled.InfoSection>
        <Styled.GraphSection>
          {this.renderPackageGraph()}
        </Styled.GraphSection>
        <Styled.DetailsSection>
          <div className="details--side">
            <div className="details__section details__links">
              <h3 className="details__header">Links</h3>
              {this.renderLinks()}
            </div>
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
                source={pkg.readme || readme}
                linkTarget="_blank"
                escapeHtml={false}
                transformLinkUri={this.parseTransformLinkUri}
              />
            </div>
          </div>
        </Styled.DetailsSection>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    downloads,
    packages,
    readmes,
  } = state;

  const {
    router,
  } = props;

  const pkg = packages[router.query.pkg];
  const readme = readmes[router.query.pkg];

  const downloadsKey = `packages:${router.query.pkg}:type:range:timeframe:last-month`;
  const pkgDownloads = downloads[downloadsKey];

  return {
    pkg,
    pkgDownloads,
    readme: readme && readme.response ? readme.response : null,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      fetchPackage,
      fetchReadme,
    }, dispatch),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Pkg));
