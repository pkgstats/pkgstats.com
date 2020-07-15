import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: fixed;
  top: 6rem;
  right: 0;
  left: 0;
  z-index: 1;
  background-color: var(--color-black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;

  .user__info {
    display: flex;
    align-items: center;
  }

  .user__pkgs {
    display: none;
    color: #999;
    margin: 0;

    span {
      color: white;
    }

    @media all and (min-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .user__image {
    margin-right: 2rem;
    max-width: 5rem;
  }

  .user__name {
    font-size: 2rem;
    margin: 0;
  }

  .user__links {
    display: flex;
  }

  .user__link {
    display: block;
    width: 2.5rem;
    height: 2.5rem;

    svg {
      fill: #999;
      transition: fill 0.5s ease-in-out;
    }
  }

  .user__link:active,
  .user__link:hover {
    svg {
      fill: #fff;
    }
  }

  .user__link + .user__link {
    margin-left: 1.5rem;
  }

  @media all and (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const UserInfo = ({ count, user, username }) => {
  if (!user) {
    return null;
  }

  const {
    name,
    avatar,
    email,
    github,
    twitter,
  } = user;

  return (
    <Wrapper>
      <div className="user__info">
        {avatar && <img className="user__image" src={avatar} alt={name || username} />}
        {!!(name || username) && <h1 className="user__name">{name || username}</h1>}
      </div>
      <h2 className="user__pkgs"><span>{count}</span> packages</h2>
      <div className="user__links">
        {github && (
          <a href={`https://github.com/${github}?ref=pkgstats.com`} className="user__link" title={`View ${github} on GitHub`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path d="M15 .37c-8.28 0-15 6.72-15 15C0 22 4.3 27.62 10.26 29.6c.75.14 1.02-.33 1.02-.72 0-.36-.01-1.3-.02-2.55-4.17.91-5.05-2.01-5.05-2.01-.68-1.73-1.67-2.19-1.67-2.19-1.36-.93.1-.91.1-.91 1.51.11 2.3 1.55 2.3 1.55 1.34 2.29 3.51 1.63 4.37 1.25.14-.97.52-1.63.95-2.01-3.33-.38-6.83-1.67-6.83-7.41 0-1.64.58-2.98 1.54-4.03-.15-.38-.67-1.9.15-3.97 0 0 1.26-.4 4.12 1.54 1.2-.33 2.48-.5 3.76-.5 1.27.01 2.56.17 3.76.5 2.86-1.94 4.12-1.54 4.12-1.54.82 2.07.3 3.59.15 3.97.96 1.05 1.54 2.39 1.54 4.03 0 5.76-3.51 7.03-6.85 7.4.54.46 1.02 1.38 1.02 2.78 0 2.01-.02 3.62-.02 4.11 0 .4.27.87 1.03.72C25.71 27.61 30 22 30 15.37c0-8.28-6.72-15-15-15z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </a>
        )}
        {twitter && (
          <a href={`https://twitter.com/${twitter}?ref=pkgstats.com`} className="user__link" title={`View ${twitter} on Twitter`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path d="M9.43 27.19c11.32 0 17.51-9.38 17.51-17.51 0-.27-.01-.53-.02-.8 1.2-.87 2.25-1.95 3.07-3.19-1.1.49-2.29.82-3.53.97a6.193 6.193 0 0 0 2.71-3.4 12.1 12.1 0 0 1-3.91 1.49 6.12 6.12 0 0 0-4.49-1.94c-3.4 0-6.16 2.76-6.16 6.15 0 .48.05.95.16 1.4-5.11-.25-9.65-2.7-12.68-6.42a6.141 6.141 0 0 0 1.9 8.21 6.124 6.124 0 0 1-2.79-.77v.08c0 2.98 2.12 5.47 4.94 6.03-.52.14-1.06.22-1.62.22-.4 0-.78-.04-1.16-.11a6.152 6.152 0 0 0 5.75 4.27A12.354 12.354 0 0 1 0 24.41c2.72 1.76 5.96 2.78 9.43 2.78" />
            </svg>
          </a>
        )}
      </div>
    </Wrapper>
  );
};

export default UserInfo;
