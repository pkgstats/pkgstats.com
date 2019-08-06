import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = process.env.NODE_ENV === 'production';
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        isProduction,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      sheet.seal();
    }
  }

  renderGoogleTag() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-145149808-1');
      `
    };
  }

  render() {
    const {
      isProduction,
    } = this.props;

    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/static/css/fonts.css" />
          {this.props.styles}
          <link rel="icon" type="image/png" href="/favicon.ico" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Pkg Stats - npm package discovery and stats viewer." />
          <meta property="og:description" content="Quickly browse and discover the best packages on npm for your next project or application." />
          <meta property="og:site_name" content="Pkg Stats" />
          <meta property="og:url" content="https://www.pkgstats.com" />
          <meta property="og:image" content="https://www.pkgstats.com/static/images/pkgstats-share-image.png" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@PkgStats" />
          <meta name="twitter:creator" content="@ryanhefner" />
          <meta name="twitter:title" content="Pkg Stats - npm package discovery and stats viewer." />
          <meta name="twitter:description" content="Quickly browse and discover the best packages on npm for your next project or application." />
          <meta name="twitter:image" content="https://www.pkgstats.com/static/images/pkgstats-share-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            /* Global site tag (gtag.js) - Google Analytics */
            <React.Fragment>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145149808-1" />
              <script dangerouslySetInnerHtml={this.renderGoogleTag()} />
            </React.Fragment>
          )}
        </body>
      </html>
    );
  }
}
