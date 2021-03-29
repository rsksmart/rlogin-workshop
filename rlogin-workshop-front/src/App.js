import { useState } from 'react'
import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import logo from './rif-id-social.png'
import './App.css'

const rLogin = new RLogin({
  cachedProvider: true,
  providerOptions: { // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      package: WalletConnectProvider, // setup wallet connect for mobile wallet support
      options: {
        rpc: {
          31: 'https://public-node.testnet.rsk.co' // use RSK public nodes to connect to the testnet
        }
      }
    }
  },
  supportedChains: [31] // enable rsk testnet network
})


function App() {
  const [provider, setProvider] = useState()
  const [account, setAccount] = useState('')

    // display pop up
  const connect = () => rLogin.connect()
    .then(response => { // the provider is used to operate with user's wallet
      setProvider(response.provider)

      // request user's account
      response.provider.request({ method: 'eth_accounts' }).then(([account]) => setAccount(account))
    })

  return (
    <div className="App">
      <h1 className="App-header">rLogin workshop</h1>
      <div>
        <img src={logo} height={200} alt="rif identity" />
      </div>
      <div>
        <RLoginButton onClick={connect}>Connect wallet</RLoginButton>
        <p>wallet address: {account}</p>
      </div>
    </div>
  );
}

export default App;
