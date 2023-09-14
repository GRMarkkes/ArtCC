// import React from "react";
import { NetworkDetails } from "helper/network";
import Header from "../Component/Header/Header";
import { StellarWalletsKit } from "stellar-wallets-kit";
// import Footer from "../Component/Footer/Footer";
// import Wallet from '../WalletConnect/walletConnection'
interface Web3PageProps {
    networkDetails: NetworkDetails;
    setPubKey: (pubKey: string) => void;
    swkKit: StellarWalletsKit;
    pubKey: string;
  }
  
function MainApp(props: Web3PageProps) {
  return (
    <>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
      />
      {/* <Wallet/>
            <Footer /> */}
    </>
  );
}

export default MainApp;
