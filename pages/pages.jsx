import * as React from 'react';

export function Pages({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
      </>
  );
};
