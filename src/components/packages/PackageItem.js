import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Link from 'components/base/Link';
import Router from 'components/base/Router';
import { fetchDownloads } from 'store/actions/DownloadsActions';
import fecha from 'fecha';

const Package = styled.div`
  a {
    text-decoration: none;
  }

  .package-item__link {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: var(--color-black);
    transition: background-color 0.2s ease-in-out;
    height: 23rem;
  }

  .package-item__link:hover {
    background-color: #111;
  }

  .package-item__header-info {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
  }

  .package-item__name {
    font-size: 1.4rem;
    margin: 0;
    margin-bottom: 0.7rem;
    padding-right: 2rem;
  }

  .package-item__author {
    font-size: 1.2rem;
    margin: 0;
  }

  .package-item__author-link {
    color: #bbb;
  }

  .package-item__version {
    display: inline-block;
    font-family: var(--font-family-mono);
    font-size: 1.2rem;
    border: 1px solid #333;
    border-radius: 0.2rem;
    padding: 0.2rem 0.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .package-item__date {
    font-size: 1.2rem;
    color: #bbb;
    text-align: right;
    margin: 0;
    padding-right: 0.6rem;
  }

  .package-item__graph-holder {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .package-item__downloads {
    font-family: var(--font-family-mono);
    font-size: 1.8rem;
  }

  .package-item__downloads__count {
    margin: 0 2rem 1rem;
  }

  .package-item__label {
    font-size: 1rem;
    // text-transform: uppercase;
    color: #999;
    margin: 0 2rem 0.5rem;
  }

  .package-item__links {
    // background-color: #333;
    padding: 1.5rem 2.6rem 1.5rem 2rem;
    display: flex;
    justify-content: flex-end;

    a + a {
      margin-left: 1rem;
    }
  }

  @media all and (min-width: 768px) {
    flex-basis: 33.3%;
  }

  @media all and (min-width: 1024px) {
    flex-basis: 25%;
  }

  @media all and (min-width: 1920px) {
    flex-basis: 20%;
  }
`;

class PackageItem extends Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  componentDidMount() {
    const {
      actions,
      downloads,
      pkg,
    } = this.props;

    if (!downloads) {
      actions.fetchDownloads(pkg.package.name);
    }
  }

  onItemClick(evt) {
    const {
      pkg,
    } = this.props;

    Router.pushRoute(`/pkg/${pkg.package.name}`);
  }

  renderLinks() {
    const {
      pkg,
    } = this.props;

    const links = [];

    ['npm', 'repository', 'homepage'].forEach(linkType => {
      if (pkg.package.links && pkg.package.links.hasOwnProperty(linkType)) {
        links.push((
          <a
            href={pkg.package.links[linkType]}
            key={`package-link-${pkg.package.name}-${linkType}`}
          >{linkType}</a>
        ));
      }
    });

    return links;
  }

  renderDownloads() {
    const {
      downloads,
    } = this.props;

    if (!downloads || !downloads.response) {
      return null;
    }

    const totalDownloads = downloads.response.downloads
      .map(item => item.downloads)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    const graphData = downloads.response.downloads.map(item => item.downloads);

    return (
      <div className="package-item__downloads">
        <p className="package-item__label">Downloads</p>
        <p className="package-item__downloads__count">{totalDownloads.toLocaleString()}</p>
        <div className="package-item__graph">
          <Sparklines data={graphData} height={25}>
            <SparklinesLine color="#333" style={{ fill: 'none' }} />
          </Sparklines>
        </div>
      </div>
    );
  }

  render() {
    const {
      pkg,
    } = this.props;

    return (
      <Package>
        <div className="package-item__link">
          <div className="package-item__header-info">
            <div className="package-item__column">
              <Link route={`/pkg/${pkg.package.name}`}>
                <a>
                  <h3 className="package-item__name">{pkg.package.name}</h3>
                </a>
              </Link>
              {!!(pkg.package.publisher && pkg.package.publisher.username) && (
                <p className="package-item__author">
                  <Link route={`/@${pkg.package.publisher.username}`}>
                    <a className="package-item__author-link">
                      {pkg.package.author ? pkg.package.author.name : pkg.package.publisher.username}
                    </a>
                  </Link>
                </p>
              )}
            </div>
            <div className="package-item__column">
              <p className="package-item__version">v{pkg.package.version}</p>
              <p className="package-item__date">
                {fecha.format(new Date(pkg.package.date), 'shortDate')}
              </p>
            </div>
          </div>
          <div className="package-item__graph-holder">
            {this.renderDownloads()}
          </div>
          <div className="package-item__links">
            {this.renderLinks()}
          </div>
        </div>
      </Package>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    pkg,
  } = props;

  const {
    downloads: downloadsState,
  } = state;

  const downloads = downloadsState[`packages:${pkg.package.name}:type:range:timeframe:last-month`];

  return {
    downloads,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators({
      fetchDownloads,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageItem);
