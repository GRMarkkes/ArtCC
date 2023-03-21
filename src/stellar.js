import StellarSdk from "stellar-sdk";

export async function createWallet() {
  // create new and unique key pair
  const pair = StellarSdk.Keypair.random();

  // public key
  let publicKey = pair.publicKey();

  // private key
  // pair.secret();
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const data = await response.json();
    return {
      data,
      secretKey: pair.secret(),
    };
  } catch (e) {
    return e;
  }
}


const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// get wallet details
export async function getAccount(publicKey) {
  try {
    const account = await server.accounts().accountId(publicKey).call();
    return account;
  } catch (error) {
    return error;
  }
}


export async function sendFunds(destinationID, secretKey, amount) {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
    let transaction;
    server
      // checks if destination account exists
      .loadAccount(destinationID)
      // If the account is not found, surface a nicer error message for logging.
      .catch(function (error) {
        if (error instanceof StellarSdk.NotFoundError) {
          throw new Error("The destination account does not exist!");
        } else return error;
      })
      // If there was no error, load up-to-date information on your account.
      .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then(function (sourceAccount) {
        // Start building the transaction.
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destinationID,
              // Because Stellar allows transaction in many currencies, you must
              // specify the asset type. The special "native" asset represents Lumens.
              asset: StellarSdk.Asset.native(),
              amount: amount.toString(),
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
      .then(function (result) {
        return result;
      })
      .catch(function (error) {
        // If the result is unknown (no response body, timeout etc.) we simply resubmit
        // already built transaction:
        // server.submitTransaction(transaction);
        return error;
      });
  } catch (error) {
    return error;
  }
}