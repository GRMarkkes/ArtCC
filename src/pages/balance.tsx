import * as Token from "token";

import { useEffect, useState } from "react";

import { Address } from "soroban-client";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

const networkUrl =
  "https://mainnet.stellar.validationcloud.io/v1/TfG9-m1TsFivRBylmjcE2Xw_GeWb9yV7wOcx1MgilH4";
const token = new Token.Contract({
  contractId: "CAMPH7W5NXSV643YAQTJX6O76G6DGSEL6TWB2HOB6QCHXALN67ZUQTHP",
  networkPassphrase: "Public Global Stellar Network ; September 2015",
  rpcUrl: networkUrl,
});

interface BalanaceProps {
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const Balanace = (props: BalanaceProps) => {
  const contractIdToken =
    "CAMPH7W5NXSV643YAQTJX6O76G6DGSEL6TWB2HOB6QCHXALN67ZUQTHP";
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function tokenDetail() {
    let name = await token.name();
    let symbol = await token.symbol();
    let publicKey = new Address(props.pubKey);

    let balance = await token.balance({ id: publicKey.toString() });
    let formatted_balance = Number(balance) / 100000000;

    setBalance(formatted_balance);
    const newName = name?.result;
    const newSymbol = symbol?.result;
    setTokenName(newName);
    setTokenSymbol(newSymbol);
    setTokenAddress(contractIdToken);
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
