import './App.css'
import AppHome from './appHome/appHome'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { WagmiConfig } from 'wagmi'
import { bsc } from '@wagmi/core/chains'

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

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <AppHome />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  )
}

export default App