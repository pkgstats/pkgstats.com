import React from 'react';
import SiteHeader from 'components/site-header/SiteHeader';

const SiteLayout = ({pageComponent: PageComponent}) => (
  <div className="site-container">
    <SiteHeader />
    <PageComponent />
  </div>
);

export default SiteLayout;
