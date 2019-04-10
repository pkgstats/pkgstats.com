import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import SiteFooter from 'components/site-footer/SiteFooter';
import SiteHeader from 'components/site-header/SiteHeader';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.styleTags}
          <link rel="icon" type="image/png" href="/static/favicon.png" />
        </Head>
        <body>
          <div className="site-wrapper">
            <SiteHeader />
            <Main />
            <NextScript />
          </div>
          <SiteFooter />
        </body>
      </html>
    );
  }
}
