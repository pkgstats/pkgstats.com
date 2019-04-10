import React from 'react';
import SiteHeader from 'components/site-header/SiteHeader';

export default ({pageComponent: PageComponent}) => (
  <div className="site-container">
    <SiteHeader />
    <PageComponent />
  </div>
);
