import { useEffect, useState } from "react";
import * as Token from "token";
import { Address } from "soroban-client";
import { StellarWalletsKit } from "stellar-wallets-kit";

const networkUrl = "https://rpc-futurenet.stellar.org:443";
const token :any  = new Token.Contract({
  contractId: "CDU2ZKX5BJB3DVVLHTN6QVYHKN2NIULULJWRLSI5CE6YPDBR62WNWJVQ",
  networkPassphrase: "Test SDF Future Network ; October 2022",
  rpcUrl: networkUrl,
});

interface BalanaceProps {
  setPubKey: (pubKey: any) => void;
  swkKit: StellarWalletsKit;
  pubKey: any;
}

const Balanace = (props: BalanaceProps) => {
  const contractIdToken :any =
    "CDU2ZKX5BJB3DVVLHTN6QVYHKN2NIULULJWRLSI5CE6YPDBR62WNWJVQ";
  const [tokenName, setTokenName] = useState <any> ("");
  const [tokenSymbol, setTokenSymbol] = useState <any> ("");
  const [tokenAddress, setTokenAddress] = useState <any>("");
  const [balance, setBalance] = useState <any> (0);

  async function tokenDetail() {
    let name : any = await token.name();
    let symbol : any = await token.symbol();
    let publicKey : any = new Address(props.pubKey);

    let balance  = await token.balance({ id: publicKey });
    let formatted_balance = Number(balance) / 100000000;

    setBalance(formatted_balance);

    setTokenName(name);
    setTokenSymbol(symbol);
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
