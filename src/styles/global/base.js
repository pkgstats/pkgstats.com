const base = `
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body,
  #__next {
    min-height: 100vh;
  }

  #__next {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  a {
    color: var(--color-foreground);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }

  code {
    font-family: var(--font-family-mono);
  }

  .site-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .app-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
  }

  .app-view--user--active {
    margin-top: 13rem;
  }

  .page-transition {
    &-enter {
      flex: 1;
      display: flex;
      flex-direction: column;
      opacity: 0;
    }

    &-enter-active {
      flex: 1;
      display: flex;
      flex-direction: column;
      opacity: 1;
      transition: opacity 300ms ease-out;
    }

    &-enter-done {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &-exit {
      flex: 1;
      display: flex;
      flex-direction: column;
      opacity: 1;
    }

    &-exit-active {
      flex: 1;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition: opacity 300ms ease-in;
    }
  }
`;

export default base;
