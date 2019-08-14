import App, { Container } from 'next/app';
import getConfig from 'next/config';
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
      accessToken: '8464c744b2074f008c9e2f155d44792a',
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
      <Container>
        <GlobalStyles />
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
          {!isShare && <SiteFooter />}
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
