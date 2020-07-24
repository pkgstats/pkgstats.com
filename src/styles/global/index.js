import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import base from './base';
import fonts from './fonts';
import reset from './reset';
import vars from './vars';

export const Base = createGlobalStyle`${base}`;
export const Fonts = createGlobalStyle`${fonts}`;
export const Reset = createGlobalStyle`${reset}`;
export const Vars = createGlobalStyle`${vars}`;

export default () => (
  <Fragment>
    <Fonts />
    <Vars />
    <Reset />
    <Base />
  </Fragment>
);
