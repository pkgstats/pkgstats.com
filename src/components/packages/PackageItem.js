import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Link from 'components/base/Link';
import Router from 'components/base/Router';
import { fetchDownloads } from 'store/actions/DownloadsActions';

dayjs.extend(relativeTime);

const Package = styled.div`
  width: 100%;

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

  .package-item__column {
    &--right {
      text-align: right;
    }
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
    align-items: center;

    svg {
      transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
    }

    a + a {
      margin-left: 1rem;
    }

    .package-link--npm {
      svg {
        fill: #999;
        height: 1rem;
      }
    }

    .package-link--repository {
      svg {
        fill: #999;
        height: 1.5rem;
      }
    }

    .package-link--homepage {
      svg {
        stroke: #999;
        height: 1.5rem;
        width: 1.5rem;
      }
    }

    .package-link--npm:active,
    .package-link--npm:hover,
    .package-link--repository:active,
    .package-link--repository:hover {
      svg {
        fill: #fff;
      }
    }

    .package-link--homepage:active,
    .package-link--homepage:hover {
      svg {
        stroke: #fff;
      }
    }
  }

  @media all and (min-width: 768px) {
    flex-basis: 33.3%;
    width: 33.3%;
  }

  @media all and (min-width: 1024px) {
    flex-basis: 25%;
    width: 25%;
  }

  @media all and (min-width: 1919px) {
    flex-basis: 20%;
    width: 20%;
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

    Router.pushRoute(`/pkg:${pkg.package.name}`);
  }

  renderLinks() {
    const {
      pkg,
    } = this.props;

    const links = [];

    ['npm', 'repository', 'homepage'].forEach(linkType => {
      if (pkg.package.links && pkg.package.links.hasOwnProperty(linkType)) {
        let linkString = linkType;

        switch (linkType) {
          case 'npm':
            linkString = <svg viewBox="0 0 780 250"><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>;
            break;

          case 'repository':
            linkString = <svg viewBox="0 0 92 92" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Git</title><g stroke="none"><path d="M90.155,41.965 L50.036,1.847 C47.726,-0.464 43.979,-0.464 41.667,1.847 L33.336,10.179 L43.904,20.747 C46.36,19.917 49.176,20.474 51.133,22.431 C53.102,24.401 53.654,27.241 52.803,29.706 L62.989,39.891 C65.454,39.041 68.295,39.59 70.264,41.562 C73.014,44.311 73.014,48.768 70.264,51.519 C67.512,54.271 63.056,54.271 60.303,51.519 C58.235,49.449 57.723,46.409 58.772,43.861 L49.272,34.362 L49.272,59.358 C49.942,59.69 50.575,60.133 51.133,60.69 C53.883,63.44 53.883,67.896 51.133,70.65 C48.383,73.399 43.924,73.399 41.176,70.65 C38.426,67.896 38.426,63.44 41.176,60.69 C41.856,60.011 42.643,59.497 43.483,59.153 L43.483,33.925 C42.643,33.582 41.858,33.072 41.176,32.389 C39.093,30.307 38.592,27.249 39.661,24.691 L29.243,14.271 L1.733,41.779 C-0.578,44.092 -0.578,47.839 1.733,50.15 L41.854,90.268 C44.164,92.578 47.91,92.578 50.223,90.268 L90.155,50.336 C92.466,48.025 92.466,44.275 90.155,41.965"></path></g></svg>;
            break;

          default:
            linkString = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
            break;
        }

        links.push((
          <a
            href={pkg.package.links[linkType]}
            className={`package-link package-link--${linkType}`}
            key={`package-link-${pkg.package.name}-${linkType}`}
            target="_blank"
            rel="noreferrer noopener"
            title={linkType}
          >{linkString}</a>
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
            <SparklinesLine color="#666" style={{ fill: 'none' }} />
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
              <Link route={`/pkg:${pkg.package.name}`}>
                <a>
                  <h3 className="package-item__name">{pkg.package.name}</h3>
                </a>
              </Link>
              {!!(pkg.package.publisher && pkg.package.publisher.username) && (
                <p className="package-item__author">
                  <Link route={`/@${pkg.package.publisher.username}`}>
                    <a className="package-item__author-link">
                      {pkg.package.publisher.username}
                    </a>
                  </Link>
                </p>
              )}
            </div>
            <div className="package-item__column package-item__column--right">
              <p className="package-item__version">v{pkg.package.version}</p>
              <p className="package-item__date">
                {!!(pkg.package && pkg.package.date) && (
                  <time dateTime={pkg.package.date}>
                    {dayjs().to(dayjs(pkg.package.date))}
                  </time>
                )}
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
