/**
 * LIBS
 */
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

/**
 * THEME
 */
import AppTheme from '~/themes/app.js';

const Layout = props => (
  <ThemeProvider theme={ AppTheme }>
    <React.Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Meet people, play games." />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400" rel="stylesheet" />

        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      </Head>

      { props.children }
    </React.Fragment>
  </ThemeProvider>
);
  
export default Layout;