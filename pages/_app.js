import "@/public/assets/scss/style.scss";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        {/*====== Required meta tags ======*/}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Adventure, Tours, Travel" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/*====== Title ======*/}
        <title>Fair Flying</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
