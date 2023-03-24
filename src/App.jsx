import "./App.css";
import { useEffect, useState } from "react";

import WalletConnectClient, {
  SIGN_CLIENT_EVENTS,
  SignClient,
} from "@walletconnect/sign-client";

import * as StellarSdk from "stellar-sdk";
import { Web3Modal } from "@web3modal/standalone";
import Account from "./Account";

const PUBNET = "stellar:pubnet";

const web3Modal = new Web3Modal({
  projectId: "69191a30a0b6a905c0b4c4f2e2ca5a1a",
  standaloneChains: [PUBNET],
});

const PROJECT_ID = "69191a30a0b6a905c0b4c4f2e2ca5a1a";

const METADATA = {
  name: "Stellar Test Connection APP By Adnan Naeem",
  description:
    "Stellar Test Connection APP Stellar Test Connection APP Stellar Test Connection APP",
  url: "https://quantumbases.com", //This is my small agency
  icons: ["https://avatars.githubusercontent.com/u/25021964?s=200&v=4.png"],
};

const STELLAR_METHODS = {
  SIGN_AND_SUBMIT: "stellar_signAndSubmitXDR",
  SIGN: "stellar_signXDR",
};

const REQUIRED_NAMESPACES = {
  stellar: {
    chains: [PUBNET],
    methods: Object.values(STELLAR_METHODS),
    events: [],
  },
};

function App() {
  const [signClient, setSignClient] = useState();
  const [sessions, setSessions] = useState();
  const [accounts, setAccounts] = useState();
  const [balance, setBalance] = useState();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("sessions", sessions);
  //     if (!sessions) {
  //       setAccounts("");
  //       setBalance("");
  //     }
  //     console.log("This will run every second!");
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });

  async function handleConnect() {
    let client = await WalletConnectClient.init({
      // logger: 'debug',
      projectId: PROJECT_ID,
      metadata: METADATA,
    });
    setSignClient(client);
    const { uri, approval } = await client.connect({
      requiredNamespaces: REQUIRED_NAMESPACES,
    });

    if (uri) {
      web3Modal.openModal({ uri });
      const sessionNamespace = await approval();
      await onSessionConnect(sessionNamespace);
      await handleBalance();
      web3Modal.closeModal();
    }
  }

  async function onSessionConnect(session) {
    if (!session) throw Error("session doesn't exist");
    try {
      console.log("session", session);
      setSessions(session);
      setAccounts(session.namespaces.stellar.accounts[0]);

      const server = new StellarSdk.Server("https://horizon.stellar.org");
      // NOTE :
      // This address variable will be replaced when going for final one on line # 83 where i have hardcoded the address
      // because i had nothing in my wallet so that's why is used one address from explorer.
      const address = session.namespaces.stellar.accounts[0];

      server
        .loadAccount(address.replace("stellar:pubnet:", ""))
        .then((account) => {
          alert('test'+ account);
          console.log(account.balances);
          const balances = account.balances;
          const xlmBalance = balances.find(
            (balance) => balance.asset_type === "native"
          ).balance;
          console.log(`XLM balance: ${xlmBalance}`);

          setBalance(xlmBalance);
        })
        .catch((error) => {
          console.error("Error loading account:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDisconnect() {
    try {
      await signClient.disconnect({
        topic: sessions.topic,
        code: 6000,
        message: "User disconnected",
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleBalance() {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  const reset = () => {
    setAccounts([]);
    setSessions([]);
  };
  return (
    <div className="App">
      {accounts ? (
        <Account accounts={accounts} setSubmit={setAccounts} balance={balance} />
      ) : (
        <>
          <button style={{marginTop: 30}} onClick={handleConnect}>Click to Connect</button>
        </>
      )}
    </div>
  );
}

export default App;
