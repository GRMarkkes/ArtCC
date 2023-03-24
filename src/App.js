import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import QRCode from "qrcode.react";
import { Server } from 'stellar-sdk';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);

  const handleConnect = async () => {
    try {
      // Set the Stellar server endpoint
      const server = new Server('https://horizon.stellar.org');
      server.loadAccount('GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN')
      .then((account) => {
        console.log(account);
      })
      .catch((error) => {
        console.error(error);
      });
      setPublicKey('GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN');
      // var server = new StellarSdk.Server("https://horizon.stellar.org");
      // const server = new StellarSdk.Server("https://horizon.stellar.org");
      // Generate a new Stellar keypair
      // const keypair = StellarSdk.Keypair.random();

      // // Load the account details for the keypair
      // const account = await server.loadAccount(keypair.publicKey());

      // // Log the account details to the console
      // console.log("Account ID:", account.id);
      // console.log("Balances:");
      // account.balances.forEach((balance) => {
      //   console.log(`  Type: ${balance.asset_type}, Balance: ${balance.balance}`);
      // });

      // // Set the public key and connection status
      // setPublicKey(keypair.publicKey());
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenQrCodeModal = () => {
    setQrCodeModalOpen(true);
  };

  const handleCloseQrCodeModal = () => {
    setQrCodeModalOpen(false);
  };

  return (
    <div>
      {!connected ? (
        <button onClick={handleConnect}>Connect to Stellar</button>
      ) : (
        <div>
          <p>Connected to Stellar!</p>
          <p>Public Key: {publicKey}</p>
          <button onClick={handleOpenQrCodeModal}>Show QR Code</button>
        </div>
      )}

      {qrCodeModalOpen && (
        <div className="qr-code-modal">
          <div className="qr-code-wrapper">
            <QRCode value={publicKey} size={200} />
          </div>
          <button onClick={handleCloseQrCodeModal}>Close</button>
        </div>
      )}

      <style>
        {`
          .qr-code-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .qr-code-wrapper {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: center;
            position: relative;
          }

          .qr-code-wrapper::after {
            content: "";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-style: solid;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent #fff transparent;
          }
        `}
      </style>
    </div>
  );
};

export default App;








// import './App.css';
// import { useEffect, useState } from "react";

// import WalletConnectClient, { SIGN_CLIENT_EVENTS , SignClient} from '@walletconnect/sign-client';

// import * as StellarSdk from 'stellar-sdk';
// import { Web3Modal } from "@web3modal/standalone";

// const PUBNET = 'stellar:pubnet';

// const web3Modal = new Web3Modal({
//   projectId: "69191a30a0b6a905c0b4c4f2e2ca5a1a",
//   standaloneChains: [PUBNET],
// });

// const PROJECT_ID = '69191a30a0b6a905c0b4c4f2e2ca5a1a';

// const METADATA = {
//     name: 'Stellar Test Connection APP By Adnan Naeem',
//     description: 'Stellar Test Connection APP Stellar Test Connection APP Stellar Test Connection APP',
//     url: 'https://quantumbases.com', //This is my small agency
//     icons: ['https://avatars.githubusercontent.com/u/25021964?s=200&v=4.png'],
// };


// const STELLAR_METHODS = {
//     SIGN_AND_SUBMIT: 'stellar_signAndSubmitXDR',
//     SIGN: 'stellar_signXDR',
// };

// const REQUIRED_NAMESPACES = {
//     stellar: {
//         chains: [PUBNET],
//         methods: Object.values(STELLAR_METHODS),
//         events: [],
//     },
// };



//   function App() {
//     const [signClient, setSignClient] = useState();
//     const [sessions, setSessions] = useState([]);
//     const [accounts, setAccounts] = useState([]);
//     const [balance, setBalance] = useState();
//     useEffect(() => {
//       const interval = setInterval(() => {
// console.log("sessions",sessions)
//         if(!sessions){
//           setAccounts("");
//           setBalance("");
          

//         }
//         console.log('This will run every second!');
//       }, 1000);
//       return () => clearInterval(interval);
//     });
  

//     async function handleConnect() {
//       let client = await WalletConnectClient.init({
//         // logger: 'debug',
//         projectId: PROJECT_ID,
//         metadata: METADATA,
//     });
//       setSignClient(client)
//       client.;
//       const { uri, approval } = await client.connect({
//         requiredNamespaces: REQUIRED_NAMESPACES,
//       });
    
//       if (uri) {
//         web3Modal.openModal({ uri });
//         const sessionNamespace = await approval();
//         await onSessionConnect(sessionNamespace);
//         await handleBalance()
//         web3Modal.closeModal();
//       }
   
//     }
    
//     async function onSessionConnect(session) {
//       if (!session) throw Error("session doesn't exist");
//       try {
//         console.log('session', session)
//         setSessions(session);
//         setAccounts(session.namespaces.stellar.accounts[0]);
        
//         const server = new StellarSdk.Server('https://horizon.stellar.org');
//         // NOTE : 
//         // This address variable will be replaced when going for final one on line # 83 where i have hardcoded the address
//         // because i had nothing in my wallet so that's why is used one address from explorer.
//         const address = session.namespaces.stellar.accounts[0]

//         server.loadAccount(address.replace("stellar:pubnet:", "")).then(account => {
//           console.log(account.balances);
//           const balances = account.balances;
//           const xlmBalance = balances.find(balance => balance.asset_type === 'native').balance;
//           console.log(`XLM balance: ${xlmBalance}`);

//           setBalance(xlmBalance)
//         })
//         .catch(error => {
//           console.error('Error loading account:', error);
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     async function handleDisconnect() {
    
//       try {

        
//         await signClient.disconnect({
//           topic: sessions.topic,
//           code: 6000,
//           message: "User disconnected",
//         });
//         reset();
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     async function handleBalance() {
//       try {
        
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     const reset = () => {
//       setAccounts([]);
//       setSessions([]);
//     };
//   return (
//     <div className="App">
      
//       <p>Account: {accounts}</p>

//       <p>Balance : {balance}</p>

//       <button onClick={handleConnect}> Connect</button>
//       <button onClick={handleDisconnect}> Disconnect</button>

//     </div>
//   );
// }

// export default App;
