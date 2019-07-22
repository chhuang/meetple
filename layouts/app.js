/**
 * LIBS
 */
import React from 'react';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

/**
 * THEME
 */
import AppTheme from '@root/themes/app.js';

const Layout = props => (
  <ThemeProvider theme={AppTheme}>
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Meet people, play games." />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Mali:500"
          rel="stylesheet"
        />

        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      </Head>

      {props.children}

      <__GlobalStyle />
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;

const __GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    min-width: 100%;
    background-color: ${p => p.theme.colour.beige};
    color: ${p => p.theme.colour.brown};
  }
`;
