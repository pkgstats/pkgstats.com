import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PackageItem from './PackageItem';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ({ items = [] }) => {
  const packageItems = items.map(item => (
    <PackageItem
      key={`package-item-${item.package.name}`}
      pkg={item}
    />
  ));

  return (
    <Grid>
      {packageItems}
    </Grid>
  );
}
