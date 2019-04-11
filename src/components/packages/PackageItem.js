import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fecha from 'fecha';

const Package = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  min-height: 25vh;

  a {
    text-decoration: none;
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
  }

  .package-item__author {
    font-size: 1.4rem;
    margin: 0;
  }

  .package-item__author-link {
    color: #bbb;
  }

  .package-item__version {
    display: inline-block;
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
  }

  .package-item__links {
    padding: 1rem 2rem;
    display: flex;

    a {
      flex-basis: 33.3%;
      text-align: center;
    }
  }

  @media all and (min-width: 768px) {
    flex-basis: 33.3%;
  }

  @media all and (min-width: 1024px) {
    flex-basis: 25%;
  }

  @media all and (min-width: 1440px) {
    flex-basis: 20%;
  }
`;

class PackageItem extends Component {
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

  render() {
    const {
      pkg,
    } = this.props;

    return (
      <Package>
        <div className="package-item__header-info">
          <div className="package-item__column">
            <h3 className="package-item__name">{pkg.package.name}</h3>
            <p className="package-item__author">
              <a
                href={`https://npmjs.com/~${pkg.package.author.username}`}
                className="package-item__author-link"
              >{pkg.package.author.name}</a>
            </p>
          </div>
          <div className="package-item__column">
            <p className="package-item__version">v{pkg.package.version}</p>
            <p className="package-item__date">
              {fecha.format(new Date(pkg.package.date), 'shortDate')}
            </p>
          </div>
        </div>
        <div className="package-item__graph-holder">

        </div>
        <div className="package-item__links">
          {this.renderLinks()}
        </div>
      </Package>
    );
  }
}

export default PackageItem;
