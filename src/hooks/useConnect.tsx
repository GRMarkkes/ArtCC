import { FUTURENET_DETAILS } from "helper/network";
import React, { useEffect } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  ISupportedWallet,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";

const useConnect = () => {
  const [selectedNetwork] = React.useState(FUTURENET_DETAILS);

  // Initial state, empty states for token/transaction details
  const [activePubKey, setActivePubKey] = React.useState("");
  const [connectWallet, setConnectWallet] = React.useState(false);
  // const [error, setError] = React.useState(null as string | null);

  // Setup swc, user will set the desired wallet on connect
  const SWKKit: StellarWalletsKit = new StellarWalletsKit({
    network: WalletNetwork.PUBLIC,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });

  const connect = () => {
    // See https://github.com/Creit-Tech/Stellar-Wallets-Kit/tree/main for more options
    SWKKit.openModal({
      onWalletSelected: async (option: ISupportedWallet) => {
        try {
          // Set selected wallet,  network, and public key
          SWKKit.setWallet(option.id);
          const publicKey = await SWKKit.getPublicKey();

          setActivePubKey(publicKey);
          setConnectWallet(false);

          console.log("publicKey", publicKey);

          SWKKit.setNetwork(WalletNetwork.PUBLIC);
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
    console.log(connect,"hudhud");
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectWallet]);
  return {
    setConnectWallet,
    networkDetails: selectedNetwork,
    setPubKey: setActivePubKey,
    swkKit: SWKKit,
    pubKey: activePubKey,
  };
};

export { useConnect };
