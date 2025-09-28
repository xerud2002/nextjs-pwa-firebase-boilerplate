import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from "../config/config"

export default class MyDocument extends Document {
  // this.props (Server only): __NEXT_DATA__, ampPath, assetPrefix, bodyTags, canonicalBase, dangerousAsPath, dataOnly, devFiles, dynamicImports, files, hasCssMode, head, headTags, html, htmlProps, hybridAmp, inAmpMode, isDevelopment, polyfillFiles, staticMarkup, styles
  // Page props in: this.props.__NEXT_DATA__.props.pageProps
  render (): React.ReactElement {
    const { locale } = this.props.__NEXT_DATA__
    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <title>Oferte Mutare</title> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
