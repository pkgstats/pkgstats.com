import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router from 'next/router';
import { PageTransition } from '@ryanhefner/next-page-transitions';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Rollbar from 'rollbar';

import SiteHeader from 'components/site-header/SiteHeader';
import SiteFooter from 'components/site-footer/SiteFooter';
import configureStore from 'store';
import GlobalStyles from 'styles/global';

// Fonts
// import "styles/fonts.scss";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      req,
    } = ctx;

    let pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps,
    };
  }

  componentDidMount() {
    // include and initialize the rollbar library with your access token
    window.rollbar = new Rollbar({
      accessToken: 'fd325ed9e173422082d1cff6a069e418',
      captureUncaught: true,
      captureUnhandledRejections: true
    });

    Router.onRouteChangeComplete = url => {
      this.trackPageView(url);
    };
  }

  trackPageView(url) {
    try {
      window.gtag('config', 'UA-145149808-1', {
        page_location: url
      });
    } catch (error) {
      // silences the error in dev mode
      // and/or if gtag fails to load
    }
  }

  render() {
    const {
      Component,
      locale,
      pageProps,
      router,
      store,
    } = this.props;

    const isShare = /\/share/.test(router.asPath);

    return (
      <React.Fragment>
        <GlobalStyles />
        <Head>
          {/* Open Graph Tags */}
          <meta property="og:type" key="og:type" content="website" />
          <meta property="og:title" key="og:title" content="Pkg Stats - npm package discovery and stats viewer." />
          <meta property="og:description" key="og:description" content="Quickly browse and discover the best packages on npm for your next project or application." />
          <meta property="og:site_name" key="og:site_name" content="Pkg Stats" />
          <meta property="og:url" key="og:url" content="https://www.pkgstats.com" />
          <meta property="og:image" key="og:image" content="https://www.pkgstats.com/static/images/pkgstats-share-image.png" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" key="twitter:site" content="@PkgStats" />
          <meta name="twitter:creator" key="twitter:creator" content="@ryanhefner" />
          <meta name="twitter:title" key="twitter:title" content="Pkg Stats - npm package discovery and stats viewer." />
          <meta name="twitter:description" key="twitter:description" content="Quickly browse and discover the best packages on npm for your next project or application." />
          <meta name="twitter:image" key="twitter:image" content="https://www.pkgstats.com/static/images/pkgstats-share-image.png" />
        </Head>
        <Provider store={store}>
          <div className="site-wrapper">
            {!isShare && <SiteHeader />}
            <PageTransition
              timeout={300}
              classNames="page-transition"
              monkeyPatchScrolling
            >
              <Component key={router.asPath} {...pageProps} />
            </PageTransition>
          </div>
          {/* {!isShare && <SiteFooter />} */}
        </Provider>
      </React.Fragment>
    );
  }
}

export default withRedux(configureStore)(MyApp);
