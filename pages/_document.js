import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet as styledComponentSheets } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  
    // Render app and page and get the context of the page with collected side effects.
    const muiSheets = new ServerStyleSheets();
    const styledSheets = new styledComponentSheets();
    const originalRenderPage = ctx.renderPage;
  
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => {
            // muiSheets.collect(<App {...props} />);
            // return styledSheets.collectStyles(<App {...props} />);
            return styledSheets.collectStyles(muiSheets.collect(<App {...props} />));
          }
        });
    
      const initialProps = await Document.getInitialProps(ctx);
    
      return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        // styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        styles: (
          <>
            {initialProps.styles}
            {[...React.Children.toArray(initialProps.styles), muiSheets.getStyleElement()]}
            {styledSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledSheets.seal()
    }
  }
