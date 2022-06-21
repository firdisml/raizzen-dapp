import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"
import { createContext, useState } from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import "../styles/globals.css";
import Layout from "../components/layout";
import { ethers } from 'ethers';
import Fonts from "../global";


export const AppContext = createContext();

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const theme = extendTheme({
  fonts: {
    heading: 'Raizzen, sans-serif',
  },
})


function MyApp({ Component, pageProps }) {

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCollab, setTotalCollab] = useState(0);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>

      <AppContext.Provider value={{ value: [totalBalance, setTotalBalance], collab: [totalCollab, setTotalCollab] }}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AppContext.Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
