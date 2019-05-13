import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PackageItem from './PackageItem';
import PackageLoadingItem from './PackageLoadingItem';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export default ({
  items = [],
  fetching = false,
  total = 0,
  pageSize = 50,
  onFetchMore = () => {},
}) => {
  const packageItems = items.map(item => (
    <PackageItem
      key={`package-item-${item.package.name}`}
      pkg={item}
    />
  ));

  return (
    <Grid>
      {packageItems}
      {!!(packageItems.length && packageItems.length < total) && (
        <PackageLoadingItem
          count={items.length}
          fetching={fetching}
          pageSize={pageSize}
          total={total}
          onEnter={onFetchMore}
        />
      )}
    </Grid>
  );
}
