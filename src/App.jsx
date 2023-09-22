import './App.css'
import AppHome from './appHome/appHome'
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";


function App() {

  const chains = [bsc]
  const projectId = '6f14b5fe7c676b85589ea96427a5b059'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: "1", chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  // const web3modal = new Web3Modal({ projectId }, ethereumClient)

  const { setTheme } = useWeb3ModalTheme();

  // Set modal theme
  setTheme({
    themeMode: 'dark',
    themeVariables: {
      "--w3m-font-family": "Mulish, sans-serif",
      "--w3m-accent-color": "rgb(27, 51, 81)",
      "--w3m-text-medium-regular-size": "12px",
      "--w3m-accent-fill-color": "#fff",
      "--w3m-button-border-radius": "8px",
      "--w3m-text-medium-regular-weight": "400",
    },
  });

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <AppHome />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App