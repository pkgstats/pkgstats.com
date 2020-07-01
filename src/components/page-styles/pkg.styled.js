import styled from 'styled-components';

export const HeaderInfo = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 5rem 1rem 0;

  .header-info__name {
    font-size: 2.8rem;
  }

  .header-info__version {
    display: inline-block;
    font-family: var(--font-family-mono);
    font-size: 2.4rem;
    padding: 0.5rem 2rem;
    border: 1px solid #222;
    border-radius: 0.2rem;
  }

  @media all and (min-width: 768px) {
    padding: 5rem 2rem 0;
  }
`;

export const PublishedSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  .published__date__label {
    font-size: 1.4rem;
    color: #999;
    margin: 0;
    margin-right: 1rem;
  }

  .published__date__time {
    display: block;
    font-family: var(--font-family-mono);
    font-size: 1.8rem;
  }

  @media all and (min-width: 768px) {
    justify-content: flex-end;
    padding: 0 2rem 1rem;
  }
`;

export const InfoSection = styled.section`
  padding: 0 1rem 5rem;

  .info__desc {
    font-size: 1.8rem;
    line-height: 1.6;
    max-width: 75rem;
  }

  .info__install__button {
    appearance: none;
    border: 0;
    background: black;
    margin: 0;

    position: relative;
    color: white;
    padding: 1rem 2rem;
    border: 1px solid #222;
    border-radius: 0.2rem;
    transition: border-color 0.2s ease-in-out;

    &::before {
      content: "Copied!";
      position: absolute;
      font-size: 1.3rem;
      background-color: #111;
      padding: 1rem;
      top: 0;
      left: calc(100% + 0.2rem);
      opacity: 0;
      height: 100%;
      transition: opacity 0.3s ease-in-out;
      z-index: 0;
    }

    &[data-copied="true"] {
      &::before {
        opacity: 1;
      }
    }

    &:hover {
      border-color: #333;
    }
  }

  .info__install {
    font-family: var(--font-family-mono);
    font-size: 1.6rem;
    line-height: 1;
  }

  @media all and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 5rem;

    .info__install__button {
      &::before {
        left: -7rem;
      }
    }
  }
`;

export const GraphSection = styled.section`

`;

export const GraphHolder = styled.div`
  .graph__info {
    padding: 0 1rem 3rem;
  }

  .graph__info__label {
    font-size: 1.4rem;
    color: #999;
    margin: 0;
    margin-bottom: 1rem;
  }

  .graph__info__data {
    font-family: var(--font-family-mono);
    font-size: 2.4rem;
    margin: 0;
  }

  @media all and (min-width: 768px) {
    .graph__info {
      padding: 0 2rem 3rem;
    }
  }
`;

export const DetailsSection = styled.section`
  padding: 5rem 2rem;

  .details__header {
    font-size: 1.8rem;
    border-top: 0.3rem solid #222;
    padding-top: 2rem;
  }

  .details__section + .details__section {
    margin-top: 5rem;
  }

  .details__readme__src {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
    line-height: 1.7;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 5rem 0 3rem;
    }

    h2 {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #333;
    }

    hr {
      border: 0;
      border-top: 1px solid #333;
      margin: 5rem 0;
    }

    img {
      max-width: 100%;
    }

    code {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      border-radius: 0.2rem;
      background-color: #222;
    }

    pre > code {
      width: 100%;
      overflow-x: scroll;
      padding: 1rem;
    }
  }

  .details__links {
    svg {
      transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
    }

    a + a {
      margin-left: 2rem;
    }

    .package-link--npm {
      svg {
        fill: #999;
        height: 2rem;
      }
    }

    .package-link--repository {
      svg {
        fill: #999;
        height: 2.5rem;
      }
    }

    .package-link--homepage {
      svg {
        stroke: #999;
        height: 3rem;
        width: 3rem;
      }
    }

    .package-link--npm:active,
    .package-link--npm:hover,
    .package-link--repository:active,
    .package-link--repository:hover {
      svg {
        fill: #fff;
      }
    }

    .package-link--homepage:active,
    .package-link--homepage:hover {
      svg {
        stroke: #fff;
      }
    }
  }

  .details__maintainers {
    .maintainer-link {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      text-decoration: none;
    }

    .maintainer-link__image {
      width: 5rem;
      margin-right: 1.5rem;
      border-radius: 0.2rem;
    }

    .maintainer-link + .maintainer-link {
      margin-top: 2rem;
    }
  }

  .details__keywords {
    a {
      display: inline-block;
      font-size: 1.4rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      margin-right: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      border-radius: 0.2rem;
      transition: border-color 0.2s ease-in-out;
    }

    a:active,
    a:hover {
      border-color: #666;
    }
  }

  @media all and (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .details--main {
      flex-basis: 70%;
      width: 70%;
    }

    .details--side {
      flex-basis: 28%;
      width: 28%;
    }
  }
`;

export const EmptyWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EmptyResults = styled.p`
  font-size: 1.6rem;
  text-align: center;
  color: #999;
  width: 100%;

  em {
    font-style: normal;
    color: white;
  }
`;
