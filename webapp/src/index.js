import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ContextProvider } from "./utils/contextModule";
import { ethers } from "ethers";

import App from "./App";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Web3ReactProvider>
  </StrictMode>,
  rootElement
);
