import { AppProps } from 'next/app';
import * as React from 'react';

export default function Pages({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
