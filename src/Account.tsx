import { useState } from "react";
import { sendFunds } from "./stellar";
var StellarSdk = require("stellar-sdk");

interface Props {
  wallet: any;
  setSubmit: any;
}

const Account: React.FC<Props> = ({ setSubmit, wallet }: any) => {
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState(
    "SCJ4DETZH4P6ESXA5DAWE7L5EJHI2F3ZCW5RJ4YSQK2CNTIL3FZX3R4Z"
  );
  const [destinationAddress, setDestinationAddress] = useState(
    "GCDTOO2NWAGR4JIT57HVKY4GOCHMFWNWKLHQG2TU6S77SNFWWEBSEYOM"
  );
  let transaction;
  const [amount, setAmount] = useState("");

  const handler = () => {
    setLoading(true);
    var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
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
          networkPassphrase: StellarSdk.Networks.TESTNET,
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
        setSubmit(false);
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
          <p>Your Balance: {wallet?.balances[0]?.balance} XLM</p>
          <p>Wallet Address: {wallet?.account_id}</p>
          <p>Send Funds</p>
          <form>
            <div>
              <label htmlFor="publicKey">Enter source account secret key</label>
              <br />
              <input
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  height: 50,
                  width: 300,
                }}
                value={accountAddress}
                type="text"
                name="publicKey"
                onChange={(e) => setAccountAddress(e.target.value)}
              />
            </div>
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
