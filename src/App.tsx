import React, { useEffect } from "react";
import "./App.css";
// import ProviderExample from "./components/ProviderExample";
// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketPlace from "./Screens/MarketPlace/marketplaceMain";
import ArtProject from "./Screens/ArtProject/ArtProjectMain";
import MainApp from "./Screens/MainScreen/MainApp";
import MainPage from "./Screens/MainPage/MainPage";
// import Home from "./pages";
// import CreateCampaigns from "./pages/createcampaigns";
// import Balanace from "./pages/balance";
// import AllCampaigns from "./pages/allcampaigns";
// ISupportedWallet
import {
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
  ISupportedWallet,
} from "stellar-wallets-kit";
import { FUTURENET_DETAILS } from "./helper/network";

function App(): JSX.Element {
  // Default to Futurenet network, only supported network for now
  const [selectedNetwork] = React.useState(FUTURENET_DETAILS);

  // Initial state, empty states for token/transaction details
  const [activePubKey, setActivePubKey] = React.useState("");
  const [connectWallet, setConnectWallet] = React.useState(true);
  // const [error, setError] = React.useState(null as string | null);

  // Setup swc, user will set the desired wallet on connect
  const [SWKKit] = React.useState(
    new StellarWalletsKit({
      network: selectedNetwork.networkPassphrase as WalletNetwork,
      selectedWallet: WalletType.FREIGHTER,
    })
  );

  React.useEffect(() => {
    SWKKit.setNetwork(selectedNetwork.networkPassphrase as WalletNetwork);
  }, [selectedNetwork.networkPassphrase, SWKKit]);

  const connect = () => {
    // See https://github.com/Creit-Tech/Stellar-Wallets-Kit/tree/main for more options
    SWKKit.openModal({
      allowedWallets: [
        WalletType.ALBEDO,
        WalletType.FREIGHTER,
        WalletType.XBULL,
      ],
      onWalletSelected: async (option: ISupportedWallet) => {
        try {
          // Set selected wallet,  network, and public key
          SWKKit.setWallet(option.type);
          const publicKey = await SWKKit.getPublicKey();

          setActivePubKey(publicKey);
          setConnectWallet(false);

          console.log("publicKey", publicKey);

          SWKKit.setNetwork(WalletNetwork.FUTURENET);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  useEffect(() => {
    if (connectWallet) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectWallet]);

  return (
    <Router>
      <Routes>
        <Route
          path="/MainApp"
          element={
            <MainApp
              networkDetails={selectedNetwork}
              setPubKey={setActivePubKey}
              swkKit={SWKKit}
              pubKey={activePubKey}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainPage
              networkDetails={selectedNetwork}
              setPubKey={setActivePubKey}
              swkKit={SWKKit}
              pubKey={activePubKey}
            />
          }
        />
        <Route
          path="/marketplace"
          element={
            <MarketPlace
              networkDetails={selectedNetwork}
              setPubKey={setActivePubKey}
              swkKit={SWKKit}
              pubKey={activePubKey}
            />
          }
        />
        <Route
          path="/ArtProject"
          element={
            <ArtProject
              networkDetails={selectedNetwork}
              setPubKey={setActivePubKey}
              swkKit={SWKKit}
              pubKey={activePubKey}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
