import { useState } from 'react'
import axios from 'axios'
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
  backendUrl: 'http://localhost:3001',
  supportedChains: [31] // enable rsk testnet network
})


function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState('')

  const [to, setTo] = useState('')
  const [value, setValue] = useState('')
  const [txHash, setTxHash] = useState('')

  const [notProtectedResponse, setNotProtectedResponse] = useState('')
  const [protectedResponse, setProtectedResponse] = useState('')

  const connect = () => rLogin.connect()
    .then(({ provider }) => { // the provider is used to operate with user's wallet
      setProvider(provider)

      // request user's account
      provider.request({ method: 'eth_accounts' }).then(([account]) => setAccount(account))
    })

  // send a transaction with user's wallet
  const send = () => provider.request({ method: 'eth_sendTransaction', params: [
    { from: account, to, value }
  ]}).then(setTxHash)

  // interact with back-end
  const handleAxiosResponse = (query, handler) => query
    .then(({ data }) => handler(data))
    .catch(({ message }) => handler(message))

  const getNotProtected = () => handleAxiosResponse(axios.get('http://localhost:3001/not-protected'), setNotProtectedResponse)

  const getProtected = () => handleAxiosResponse(axios.get('http://localhost:3001/protected', {
    headers: { 'Authorization': `DIDAuth ${localStorage.getItem('RLOGIN_ACCESS_TOKEN')}` }
  }), setProtectedResponse)

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
      <hr />
      <div>
        <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="to" />
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="value" />
        <button onClick={send}>Send</button>
        <p>tx: {txHash}</p>
      </div>
      <hr />
      <div>
        <button onClick={getNotProtected}>not protected endpoint</button>
        <p>Response: {notProtectedResponse}</p>
      </div>
      <div>
        <button onClick={getProtected}>protected endpoint</button>
        <p>Response: {protectedResponse}</p>
      </div>
    </div>
  );
}

export default App;
