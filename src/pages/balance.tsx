import { useEffect, useState } from "react";
import * as token from "token";

import { StellarWalletsKit } from "stellar-wallets-kit";

interface BalanaceProps {
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const Balanace = (props: BalanaceProps) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function tokenDetail() {
    let name = await token.name();
    let symbol = await token.symbol();

    let balance = await token.balance({ id: props.pubKey });
    let formatted_balance = Number(balance) / 100000000;

    setBalance(formatted_balance);

    setTokenName(name);
    setTokenSymbol(symbol);
    setTokenAddress(token.CONTRACT_ID);
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
