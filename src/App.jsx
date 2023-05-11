import './App.css';
import { useState } from "react";

import WalletConnectClient from '@walletconnect/sign-client';

import * as StellarSdk from 'stellar-sdk';
import { Web3Modal } from "@web3modal/standalone";
import mainbackground from './Asset/Images/Main_background.png'
import wallet_icon from './Asset/SVG/wallet.svg'
import leager from './Asset/SVG/Leager.svg'
import Message_Icon from './Asset/SVG/Message_Icon.svg'
import Footer from './Screens/Component/Footer/Footer';
import Header from './Screens/Component/Header/Header';
import Walletconnection from './Screens/WalletConnect/walletConnection';
import MarketPlace from './Screens/MarketPlace/marketplaceMain';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import ArtProject from './Screens/ArtProject/ArtProjectMain';
import MainApp from './Screens/MainScreen/MainApp.jsx';
const PUBNET = 'stellar:pubnet';

const web3Modal = new Web3Modal({
  projectId: "69191a30a0b6a905c0b4c4f2e2ca5a1a",
  standaloneChains: [PUBNET],
});

const PROJECT_ID = '69191a30a0b6a905c0b4c4f2e2ca5a1a';

const METADATA = {
  name: 'Stellar Test Connection APP By Adnan Naeem',
  description: 'Stellar Test Connection APP Stellar Test Connection APP Stellar Test Connection APP',
  url: '',
  icons: ['https://avatars.githubusercontent.com/u/25021964?s=200&v=4.png'],
};


const STELLAR_METHODS = {
  SIGN_AND_SUBMIT: 'stellar_signAndSubmitXDR',
  SIGN: 'stellar_signXDR',
};

const REQUIRED_NAMESPACES = {
  stellar: {
    chains: [PUBNET],
    methods: Object.values(STELLAR_METHODS),
    events: [],
  },
};

const server = new StellarSdk.Server('https://horizon.stellar.org');




function App() {
  const [signClient, setSignClient] = useState();
  const [sessions, setSessions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [txnHash, setTxnHash] = useState();


  async function handleConnect() {
    let client = await WalletConnectClient.init({
      // logger: 'debug',
      projectId: PROJECT_ID,
      metadata: METADATA,
    });
    setSignClient(client)
    await subscribeToEvents(client);

    const { uri, approval } = await client.connect({
      requiredNamespaces: REQUIRED_NAMESPACES,
    });

    if (uri) {
      web3Modal.openModal({ uri });
      const sessionNamespace = await approval();
      await onSessionConnect(sessionNamespace);
      web3Modal.closeModal();

    }

  }

  async function onSessionConnect(session) {
    if (!session) throw Error("session doesn't exist");
    try {
      console.log('session', session)
      setSessions(session);

      const address = session.namespaces.stellar.accounts[0]
      const result = address.split(':')[2];
      setAccounts(result);
      server.loadAccount(result).then(account => {
        console.log(account.balances);
        const balances = account.balances;
        const xlmBalance = balances.find(balance => balance.asset_type === 'native').balance;
        console.log(`XLM balance: ${xlmBalance}`);

        setBalance(xlmBalance)
      })
        .catch(error => {
          // console.error('Error loading account:', error);
          setBalance(0)
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDisconnect() {
    try {
      if (sessions) {
        await signClient.disconnect({
          topic: sessions.topic,
          code: 6000,
          message: "User disconnected",
        });
        reset();
      }
    } catch (e) {
      console.log(e);
      return e.message
    }
  }

  async function subscribeToEvents(client) {
    if (!client)
      throw Error("No events to subscribe to b/c the client does not exist");

    try {
      client.on("session_delete", () => {
        console.log("user disconnected the session from their wallet");
        reset();
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSend() {
    try {

      const sourceAccount = await server.loadAccount(accounts);
      const destinationId = 'GCEN6CP6PJYQEQJG4XHNHOQZQVDKE3FOXJRXH5N4HDTFOINEEIM4FNWR';
      const amount = '2';

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: '0.000001',
        networkPassphrase: StellarSdk.Networks.PUBLIC,
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        }))
        .setTimeout(30)
        .build();

      const xdr = transaction.toEnvelope().toXDR('base64');

      const response = await signClient.request({
        topic: sessions.topic,
        chainId: PUBNET,
        request: {
          method: STELLAR_METHODS.SIGN_AND_SUBMIT,
          params: {
            xdr,
          },
        },
      })
      const signature = response.result;
      transaction.signatures.push(signature);

      const result = await server.submitTransaction(transaction);
      console.log(`Transaction submitted: ${result.hash}`);
      setTxnHash(result)
    } catch (e) {
      console.log(e);
    }
  }

  const reset = () => {
    setAccounts([]);
    setSessions([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp/>}/>
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/ArtProject" element={<ArtProject />} />
      </Routes>
    </Router>
  );
}

export default App;
