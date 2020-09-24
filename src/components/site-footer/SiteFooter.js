import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 3rem;

  font-size: 1.4rem;

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

const SiteFooter = () => (
  <Footer>
    <div className="credits">
      <p>Built by <a href="https://www.ryanhefner.com">Ryan Hefner</a></p>
    </div>
    <div className="social">
      <p><a href="https://twitter.com/ryanhefner">@ryanhefner</a></p>
    </div>
  </Footer>
);

export default SiteFooter;
