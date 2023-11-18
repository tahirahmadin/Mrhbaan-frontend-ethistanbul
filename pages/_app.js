import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../Store";
import { StyledEngineProvider } from "@mui/material/styles";

import { HelmetProvider } from "react-helmet-async";
import { CssBaseline } from "@mui/material";
import ethersServiceProvider from "../services/ethersServiceProvider";
import "../web3";

import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Layout from "../components/resuableComponents/Layout";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import { MoralisProvider } from "react-moralis";
import Script, { initScriptLoader } from "next/script";
import Head from "next/head";
// Wallet Connect
import { Web3ReactProvider } from "@web3-react/core";
import { graphQueryUrl } from "../utils/constants";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const apolloClient = new ApolloClient({
  uri: graphQueryUrl,
  cache: new InMemoryCache(),
});

export const emotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="shortcut icon"
          href="https://www.sleepswap.io/SleepSwap_Plain.png"
          type="image/x-icon"
        />
        <link rel="icon" href="https://www.sleepswap.io/SleepSwap_Plain.png" />
        <link
          rel="icon"
          type="image/png"
          href="https://www.sleepswap.io/SleepSwap_Plain.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://www.sleepswap.io/SleepSwap_Plain.png"
        />
        <meta name="revisit-after" content="1 days" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      <Web3ReactProvider
        // getLibrary={getLibrary}
        getLibrary={() => ethersServiceProvider.getProvider()}
      >
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <CacheProvider value={emotionCache}>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <HelmetProvider>
                    <CssBaseline />
                    <Layout noContainer>
                      <Component {...pageProps} />
                    </Layout>
                  </HelmetProvider>
                </ThemeProvider>
              </StyledEngineProvider>
            </CacheProvider>
          </Provider>
        </ApolloProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
