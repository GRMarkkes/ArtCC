import {
  getServer,
  getTokenBalance,
  getTokenName,
  getTokenSymbol,
  getTxBuilder,
} from "../helper/soroban";
import { useEffect, useState } from "react";

import { BASE_FEE } from "soroban-client";
import { FUTURENET_DETAILS } from "../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

interface BalanaceProps {
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const Balanace = (props: BalanaceProps) => {
  const [selectedNetwork] = useState(FUTURENET_DETAILS);

  const contractIdToken = import.meta.env.VITE_CONTRACT_TOKEN_ID || "";
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function tokenDetail() {
    setTokenAddress(contractIdToken);

    try {
      {
        const server = getServer(selectedNetwork);
        const txBuilder = await getTxBuilder(
          props.pubKey,
          BASE_FEE,
          server,
          selectedNetwork.networkPassphrase
        );
        const symbol = await getTokenSymbol(contractIdToken, txBuilder, server);
        const name = await getTokenName(contractIdToken, txBuilder, server);
        setTokenSymbol(symbol);
        setTokenName(name);
      }

      {
        const server = getServer(selectedNetwork);
        const txBuilder = await getTxBuilder(
          props.pubKey,
          BASE_FEE,
          server,
          selectedNetwork.networkPassphrase
        );
        const balance = await getTokenBalance(
          props.pubKey,
          contractIdToken,
          txBuilder,
          server
        );
        setBalance(balance);
      }
    } catch (error) {
      console.log("🚀 ~ tokenDetail ~ error:", error);
      // console.log(error);
    }
  }

  useEffect(() => {
    tokenDetail();
  });

  return (
    <div
      style={{
        // display: "flex",
        justifyContent: "left",
        alignItems: "Right",
        height: "100vh",
        marginLeft: "100px",
      }}
    >
      <h1>Token Detail</h1>
      <h4>Token Name: {tokenName}</h4>
      <h4>Symbol: {tokenSymbol}</h4>
      <h5>Token Contract Address: {tokenAddress}</h5>
      <h2>
        Balance: {balance} {tokenSymbol}
      </h2>
    </div>
  );
};

export default Balanace;
