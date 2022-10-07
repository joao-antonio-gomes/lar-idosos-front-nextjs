import * as React from 'react';

export default function Pages({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
      </>
  );
};
