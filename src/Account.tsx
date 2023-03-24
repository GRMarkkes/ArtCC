import { useEffect, useState } from "react";
import * as StellarSdk from "stellar-sdk";
import WalletConnectClient from "@walletconnect/client";

interface Props {
  accounts: any;
  balance: any;
  setSubmit: any;
}

const Account: React.FC<Props> = ({
  setSubmit,
  accounts,
  balance,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState(
    "SCALMKS5KZJ53VY4RPUCOY2BJMV2WMKCYQLE7SHZXV5Y7AK5JEWZVC6R"
  );
  const [destinationAddress, setDestinationAddress] = useState(
    "GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN"
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const client = new WalletConnectClient({
  //       /* options */
  //     });

  //     // check if the client is currently connected to a session
  //     if (client.connected) {
  //       console.log("Client is connected to a session");
  //     } else {
  //       console.log("Client is not currently connected to a session");
  //     }
  //     console.log("This will run every second!");
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  let transaction;
  const [amount, setAmount] = useState("");

  const handler = () => {
    setLoading(true);
    var server = new StellarSdk.Server("https://horizon.stellar.org");
    var sourceKeys = StellarSdk.Keypair.fromSecret(accountAddress);
    var destinationId = destinationAddress;

    server
      .loadAccount(destinationId)
      .catch(function (error: any) {
        if (error instanceof StellarSdk.NotFoundError) {
          throw new Error("The destination account does not exist!");
        } else return error;
      })
      .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then(function (sourceAccount: any) {
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.PUBLIC,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destinationId,
              asset: StellarSdk.Asset.native(),
              amount: amount,
            })
          )
          .addMemo(StellarSdk.Memo.text("Test Transaction"))
          .setTimeout(180)
          .build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
      })
      .then(function (result: any) {
        alert("Fund transfer successfully");
        setLoading(false);
        setSubmit("");
        console.log("Success! Results:", result);
      })
      .catch(function (error: any) {
        console.error("Something went wrong!", error);
        // If the result is unknown (no response body, timeout etc.) we simply resubmit
        // already built transaction:
        // server.submitTransaction(transaction);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Please Wait</p>
      ) : (
        <div style={{ paddingBottom: 40 }}>
          <p>Your Balance: {balance} XLM</p>
          <p>Wallet Address: {accounts}</p>
          <p>Send Funds</p>
          <form>
            <div>
              <label htmlFor="publicKey">
                Enter destination source account id
              </label>
              <br />
              <input
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  height: 50,
                  width: 300,
                }}
                value={destinationAddress}
                type="text"
                name="amount"
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="publicKey">Enter amount to transfer</label>
              <br />
              <input
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  height: 50,
                  width: 300,
                }}
                value={amount}
                type="text"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {!loading ? (
              <button onClick={handler} disabled={loading}>
                Send Payments
              </button>
            ) : (
              <button disabled={loading}>Please Wait...</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Account;
