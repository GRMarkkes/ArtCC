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
  const [amount, setAmount] = useState("");

  // var sourceKeys = StellarSdk.Keypair.fromSecret(
  //   "SCJ4DETZH4P6ESXA5DAWE7L5EJHI2F3ZCW5RJ4YSQK2CNTIL3FZX3R4Z"
  // );
  // var destinationId =
  //   "GCDTOO2NWAGR4JIT57HVKY4GOCHMFWNWKLHQG2TU6S77SNFWWEBSEYOM";
  // // Transaction will hold a built transaction we can resubmit if the result is unknown.

  const handler = () => {
    setLoading(true);
    var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
    var sourceKeys = StellarSdk.Keypair.fromSecret(accountAddress);
    var destinationId = destinationAddress; // Transaction will hold a built transaction we can resubmit if the result is unknown.
    var transaction;

    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged
    // the transaction fee when the transaction fails.
    server
      .loadAccount(destinationId)
      // If the account is not found, surface a nicer error message for logging.
      .catch(function (error: any) {
        if (error instanceof StellarSdk.NotFoundError) {
          throw new Error("The destination account does not exist!");
        } else return error;
      })
      // If there was no error, load up-to-date information on your account.
      .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then(function (sourceAccount: any) {
        // Start building the transaction.
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destinationId,
              // Because Stellar allows transaction in many currencies, you must
              // specify the asset type. The special "native" asset represents Lumens.
              asset: StellarSdk.Asset.native(),
              amount: amount,
            })
          )
          // A memo allows you to add your own metadata to a transaction. It's
          // optional and does not affect how Stellar treats the transaction.
          .addMemo(StellarSdk.Memo.text("Test Transaction"))
          // Wait a maximum of three minutes for the transaction
          .setTimeout(180)
          .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(sourceKeys);
        // And finally, send it off to Stellar!
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
        <div style={{paddingBottom: 40}}>
          {/* display wallet balances */}
          <p>Your Balance: {wallet?.balances[0]?.balance} XLM</p>
          <p>Wallet Address: {wallet?.account_id}</p>
          <p>Send Funds</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
            
              // unless an error, transactions always take few seconds / minutes to be completely done
              setLoading(false);
            }}
          >
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
            <label htmlFor="publicKey">Enter destination source account id</label>
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
