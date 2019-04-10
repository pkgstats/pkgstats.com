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

  body {
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
`;

export default base;
