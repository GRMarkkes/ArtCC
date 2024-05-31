import {
  FREIGHTER_ID,
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
import React, { useEffect } from "react";

import { FUTURENET_DETAILS } from "../helper/network";

const useConnect = () => {
  const [activePubKey, setActivePubKey] = React.useState(
    localStorage.getItem('publicKey') || ""
  );
  const [connectWallet, setConnectWallet] = React.useState(false);

  const SWKKit: StellarWalletsKit = new StellarWalletsKit({
    network:
      WalletNetwork[import.meta.env.VITE_NETWORK as keyof typeof WalletNetwork],
    selectedWalletId: FREIGHTER_ID,
    modules: allowAllModules(),
  });

  const connect = () => {
    SWKKit.openModal({
      onWalletSelected: async (option: ISupportedWallet) => {
        try {
          SWKKit.setWallet(option.id);
          const publicKey = await SWKKit.getPublicKey();

          setActivePubKey(publicKey);
          setConnectWallet(false);
          localStorage.setItem('publicKey', publicKey); // Save public key to local storage

          SWKKit.setNetwork(
            WalletNetwork[
              import.meta.env.VITE_NETWORK as keyof typeof WalletNetwork
            ]
          );
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
  }, [connectWallet]);

  useEffect(() => {
    const savedPublicKey = localStorage.getItem('publicKey');
    if (savedPublicKey) {
      setActivePubKey(savedPublicKey);
      // If needed, you can also reinitialize the wallet here
    }
  }, []);

  return {
    setConnectWallet,
    networkDetails: FUTURENET_DETAILS,
    setPubKey: setActivePubKey,
    swkKit: SWKKit,
    pubKey: activePubKey,
  };
};

export { useConnect };
