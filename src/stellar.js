import * as StellarSdk from 'stellar-sdk';

export async function createWallet() {
  const pair = StellarSdk.Keypair.random();
  let publicKey = pair.publicKey();

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
      .loadAccount(destinationID)
      .catch(function (error) {
        if (error instanceof StellarSdk.NotFoundError) {
          throw new Error("The destination account does not exist!");
        } else return error;
      })
      .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then(function (sourceAccount) {
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destinationID,
              asset: StellarSdk.Asset.native(),
              amount: amount.toString(),
            })
          )
          .addMemo(StellarSdk.Memo.text("Test Transaction"))
          .setTimeout(180)
          .build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
      })
      .then(function (result) {
        return result;
      })
      .catch(function (error) {
        return error;
      });
  } catch (error) {
    return error;
  }
}