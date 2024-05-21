/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

// interface BalanaceProps {
//   setPubKey: (pubKey: string) => void;
//   swkKit: StellarWalletsKit;
//   pubKey: string;
// }

const Balanace = () => {

  const contractIdToken = import.meta.env.VITE_CONTRACT_TOKEN_ID || "";
  const [tokenAddress, setTokenAddress] = useState("");

  async function tokenDetail() {
    setTokenAddress(contractIdToken);

    try {
      {
        // const server = getServer(selectedNetwork);
        // const txBuilder = await getTxBuilder(
        //   props.pubKey,
        //   BASE_FEE,
        //   server,
        //   selectedNetwork.networkPassphrase
        // );
        // const symbol = await getTokenSymbol(contractIdToken, txBuilder, server);
        // const name = await getTokenName(contractIdToken, txBuilder, server);
        // setTokenSymbol(symbol);
        // setTokenName(name);
      }

      {
        // const server = getServer(selectedNetwork);
        // const txBuilder = await getTxBuilder(
        //   props.pubKey,
        //   BASE_FEE,
        //   server,
        //   selectedNetwork.networkPassphrase
        // );
        // const balance = await getTokenBalance(
        //   props.pubKey,
        //   contractIdToken,
        //   txBuilder,
        //   server
        // );
        // setBalance(balance);
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
      <h4>Token Name: </h4>
      <h4>Symbol: </h4>
      <h5>Token Contract Address: {tokenAddress}</h5>
      <h2>
        Balance:
      </h2>
    </div>
  );
};

export default Balanace;
