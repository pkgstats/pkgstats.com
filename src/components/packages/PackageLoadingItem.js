import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ScrollTrigger from 'react-scroll-trigger';

const Item = styled.div`
  width: 100%;
  height: 23rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.2rem;
    color: #999;
  }

  @media all and (min-width: 768px) {
    flex-basis: 33.3%;
    width: 33.3%;
  }

  @media all and (min-width: 1024px) {
    flex-basis: 25%;
    width: 25%;
  }

  @media all and (min-width: 1920px) {
    flex-basis: 20%;
    width: 20%;
  }
`;

const PackageLoadingItem = ({
  fetching = false,
  count = 0,
  total = 0,
  pageSize = 50,
  onEnter = () => {},
}) => (
  <Item>
    <ScrollTrigger onEnter={onEnter}>
      <p>{`Loading ${Number((count / pageSize) + 1).toLocaleString()} of ${Math.ceil(total / pageSize).toLocaleString()}`}</p>
    </ScrollTrigger>
  </Item>
);

PackageLoadingItem.propTypes = {
  fetching: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

PackageLoadingItem.defaultProps = {
  fetching: false,
  page: 1,
  totalPages: 1,
};

export default PackageLoadingItem;
