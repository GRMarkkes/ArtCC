import "./App.css";
import { createWallet } from "./stellar";
import { useState } from "react";
import Account from "./Account";
import { getAccount } from "./stellar";

function App() {
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [accountAddress, setAccountAddress] = useState('GCDTOO2NWAGR4JIT57HVKY4GOCHMFWNWKLHQG2TU6S77SNFWWEBSEYOM');
  const [walletDetails, setWalletDetails] = useState(null);

  const alreadyAccount = async() => {
    setLoading(true);
    const data = await getAccount(accountAddress);
    console.log(JSON.stringify(data, null, 2));
    if (data?.balances) {
      setWalletDetails(data);
      setSubmit(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Conditional rendering */}
        {submit ? (
          <Account setSubmit={setSubmit} wallet={walletDetails} />
        ) : (
          <>
            {/* existing user */}
            <h2>Do you already have an account?</h2>
              <div>
                <label htmlFor="publicKey">Enter source account number</label>
                <br />
                <input
                  style={{marginTop: 20, marginBottom: 20, height: 50, width: 300}}
                  type="text"
                  value={accountAddress}
                  onChange={(e) =>
                    setAccountAddress(e.target.value)
                  }
                />
              </div>
              {!loading ? 
                <button onClick={()=>alreadyAccount()} disabled={loading}>Submit
                </button>
              : <button disabled={loading}>Please Wait...
              </button>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// var StellarSdk = require("stellar-sdk");

// function App() {

//   const handler=()=>{
//     var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
//     var sourceKeys = StellarSdk.Keypair.fromSecret(
//       "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4",
//     );
//     var destinationId = "GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN";
//     // Transaction will hold a built transaction we can resubmit if the result is unknown.
//     var transaction;

//     // First, check to make sure that the destination account exists.
//     // You could skip this, but if the account does not exist, you will be charged
//     // the transaction fee when the transaction fails.
//     server
//       .loadAccount(destinationId)
//       // If the account is not found, surface a nicer error message for logging.
//       .catch(function (error) {
//         if (error instanceof StellarSdk.NotFoundError) {
//           throw new Error("The destination account does not exist!");
//         } else return error;
//       })
//       // If there was no error, load up-to-date information on your account.
//       .then(function () {
//         return server.loadAccount(sourceKeys.publicKey());
//       })
//       .then(function (sourceAccount) {
//         // Start building the transaction.
//         transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
//           fee: StellarSdk.BASE_FEE,
//           networkPassphrase: StellarSdk.Networks.TESTNET,
//         })
//           .addOperation(
//             StellarSdk.Operation.payment({
//               destination: destinationId,
//               // Because Stellar allows transaction in many currencies, you must
//               // specify the asset type. The special "native" asset represents Lumens.
//               asset: StellarSdk.Asset.native(),
//               amount: "0.0001",
//             }),
//           )
//           // A memo allows you to add your own metadata to a transaction. It's
//           // optional and does not affect how Stellar treats the transaction.
//           .addMemo(StellarSdk.Memo.text("Test Transaction"))
//           // Wait a maximum of three minutes for the transaction
//           .setTimeout(180)
//           .build();
//         // Sign the transaction to prove you are actually the person sending it.
//         transaction.sign(sourceKeys);
//         // And finally, send it off to Stellar!
//         return server.submitTransaction(transaction);
//       })
//       .then(function (result) {
//         console.log("Success! Results:", result);
//       })
//       .catch(function (error) {
//         console.error("Something went wrong!", error);
//         // If the result is unknown (no response body, timeout etc.) we simply resubmit
//         // already built transaction:
//         // server.submitTransaction(transaction);
//       });
//   }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <button onClick={handler}>press me</button>
//       </header>
//     </div>
//   );
// }

// export default App;
