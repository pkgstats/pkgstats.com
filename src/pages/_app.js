import App, { Container } from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import configureStore from 'store';
import GlobalStyles from 'styles/global';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      req,
    } = ctx;

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return {
      pageProps,
    };
  }

  render() {
    const {
      Component,
      locale,
      pageProps,
      store,
    } = this.props;

    return (
      <Container>
        <GlobalStyles />
        <Provider store={store}>
          <Component
            {...pageProps}
          />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
