import Head from "next/head";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";
import reset from "styled-reset";

const theme = {};

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

type Theme = typeof theme;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SecretCamp 2020 Story</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
