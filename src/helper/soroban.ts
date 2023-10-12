import {
  Address,
  Contract,
  Memo,
  MemoType,
  nativeToScVal,
  Operation,
  scValToNative,
  Server,
  SorobanRpc,
  TimeoutInfinite,
  Transaction,
  TransactionBuilder,
  ScInt,
  xdr,
} from "soroban-client";
import BigNumber from "bignumber.js";
import { NetworkDetails } from "./network";
import { stroopToXlm } from "./format";
import { ERRORS } from "./error";

// TODO: once soroban supports estimated fees, we can fetch this
export const BASE_FEE = "100";
export const baseFeeXlm = stroopToXlm(BASE_FEE).toString();

export const SendTxStatus: {
  [index: string]: SorobanRpc.SendTransactionStatus;
} = {
  Pending: "PENDING",
  Duplicate: "DUPLICATE",
  Retry: "TRY_AGAIN_LATER",
  Error: "ERROR",
};

export const XLM_DECIMALS = 7;

export const RPC_URLS: { [key: string]: string } = {
  FUTURENET: "https://rpc-futurenet.stellar.org/",
};

// Can be used whenever you need an Address argument for a contract method
export const accountToScVal = (account: string) =>
  new Address(account).toScVal();

// Can be used whenever you need an i128 argument for a contract method
export const numberToI128 = (value: number): xdr.ScVal =>
  nativeToScVal(value, { type: "i128" });

// Given a display value for a token and a number of decimals, return the correspding BigNumber
export const parseTokenAmount = (value: string, decimals: number) => {
  const comps = value.split(".");

  let whole = comps[0];
  let fraction = comps[1];
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }

  // Trim trailing zeros
  while (fraction[fraction.length - 1] === "0") {
    fraction = fraction.substring(0, fraction.length - 1);
  }

  // If decimals is 0, we have an empty string for fraction
  if (fraction === "") {
    fraction = "0";
  }

  // Fully pad the string with zeros to get to value
  while (fraction.length < decimals) {
    fraction += "0";
  }

  const wholeValue = new BigNumber(whole);
  const fractionValue = new BigNumber(fraction);

  return wholeValue.shiftedBy(decimals).plus(fractionValue);
};

// Get a server configfured for a specific network
export const getServer = (networkDetails: NetworkDetails) =>
  new Server(RPC_URLS[networkDetails.network], {
    allowHttp: networkDetails.networkUrl.startsWith("http://"),
  });

// Get a TransactionBuilder configured with our public key
export const getTxBuilder = async (
  pubKey: string,
  fee: string,
  server: Server,
  networkPassphrase: string
) => {
  const source = await server.getAccount(pubKey);
  return new TransactionBuilder(source, {
    fee,
    networkPassphrase,
  });
};

//  Can be used whenever we need to perform a "read-only" operation
//  Used in getTokenSymbol, getTokenName, and getTokenDecimals
export const simulateTx = async <ArgType>(
  tx: Transaction<Memo<MemoType>, Operation[]>,
  server: Server
): Promise<ArgType> => {
  const response = await server.simulateTransaction(tx);

  if ("result" in response && response.result !== undefined) {
    return scValToNative(response.result.retval);
  }

  throw new Error("cannot simulate transaction");
};

// Build and submits a transaction to the Soroban RPC
// Polls for non-pending state, returns result after status is updated
export const submitTx = async (
  signedXDR: string,
  networkPassphrase: string,
  server: Server
) => {
  const tx = TransactionBuilder.fromXDR(signedXDR, networkPassphrase);

  const sendResponse = await server.sendTransaction(tx);

  if (sendResponse.errorResultXdr) {
    throw new Error(ERRORS.UNABLE_TO_SUBMIT_TX);
  }

  if (sendResponse.status === SendTxStatus.Pending) {
    let txResponse = await server.getTransaction(sendResponse.hash);

    // Poll this until the status is not "NOT_FOUND"
    while (txResponse.status === SorobanRpc.GetTransactionStatus.NOT_FOUND) {
      // See if the transaction is complete
      // eslint-disable-next-line no-await-in-loop
      txResponse = await server.getTransaction(sendResponse.hash);
      // Wait a second
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (txResponse.status === SorobanRpc.GetTransactionStatus.SUCCESS) {
      return txResponse.resultXdr.toXDR("base64");
    }
  }
  throw new Error(
    `Unabled to submit transaction, status: ${sendResponse.status}`
  );
};

// Get the tokens symbol, decoded as a string
export const getTokenSymbol = async (
  tokenId: string,
  txBuilder: TransactionBuilder,
  server: Server
) => {
  const contract = new Contract(tokenId);

  const tx = txBuilder
    .addOperation(contract.call("symbol"))
    .setTimeout(TimeoutInfinite)
    .build();

  const result = await simulateTx<string>(tx, server);
  return result;
};

// Get the tokens name, decoded as a string
export const getTokenName = async (
  tokenId: string,
  txBuilder: TransactionBuilder,
  server: Server
) => {
  const contract = new Contract(tokenId);
  const tx = txBuilder
    .addOperation(contract.call("name"))
    .setTimeout(TimeoutInfinite)
    .build();

  const result = await simulateTx<string>(tx, server);
  return result;
};

// Get the tokens decimals, decoded as a number
export const getTokenDecimals = async (
  tokenId: string,
  txBuilder: TransactionBuilder,
  server: Server
) => {
  const contract = new Contract(tokenId);
  const tx = txBuilder
    .addOperation(contract.call("decimals"))
    .setTimeout(TimeoutInfinite)
    .build();

  const result = await simulateTx<number>(tx, server);
  return result;
};

// Build a "mint" operation, and prepare the corresponding XDR
// https://github.com/stellar/soroban-examples/blob/main/token/src/contract.rs#L39
export const createNewCampaign = async ({
  contractID,
  artistPubKey,
  title,
  desc,
  imageUrl,
  target,
  deadline,
  memo,
  txBuilderC,
  server,
  networkPassphrase,
  category,
  date,
  main_location,
}: {
  contractID: string;
  artistPubKey: string;
  title: string;
  desc: string;
  imageUrl: string;
  target: string;
  deadline: string;
  memo: string;
  txBuilderC: TransactionBuilder;
  server: Server;
  networkPassphrase: string;
  category: string;
  date: string;
  main_location: string;
}) => {
  const contract = new Contract(contractID);

  try {
    const tx = txBuilderC
      .addOperation(
        contract.call(
          "create_campaign",
          ...[
            accountToScVal(artistPubKey),
            xdr.ScVal.scvString(title),
            xdr.ScVal.scvString(desc),
            xdr.ScVal.scvString(category),
            xdr.ScVal.scvString(main_location),
            xdr.ScVal.scvString(date),
            xdr.ScVal.scvString(imageUrl),
            new ScInt(target).toI128(),
            new ScInt(deadline).toU64(),
          ]
        )
      )
      .setTimeout(TimeoutInfinite);

    if (memo?.length > 0) {
      tx.addMemo(Memo.text(memo));
    }

    const preparedTransaction = await server.prepareTransaction(
      tx.build(),
      networkPassphrase
    );

    return preparedTransaction.toXDR();
  } catch (err) {
    console.log("err");
    return "error";
  }
};

export const donateToCampaignByID = async ({
  contractID,
  id,
  donorPubKey,
  amount,
  nativeToken,
  memo,
  txBuilderC,
  server,
  networkPassphrase,
}: {
  contractID: string;
  id: number;
  donorPubKey: string;
  amount: string;
  nativeToken: string;
  memo: string;
  txBuilderC: TransactionBuilder;
  server: Server;
  networkPassphrase: string;
}) => {
  const contract = new Contract(contractID);

  try {
    const tx = txBuilderC
      .addOperation(
        contract.call(
          "donate_to_campaign",
          ...[
            xdr.ScVal.scvU32(id),
            accountToScVal(donorPubKey),
            new ScInt(amount).toI128(),
            accountToScVal(nativeToken),
          ]
        )
      )
      .setTimeout(TimeoutInfinite);

    if (memo?.length > 0) {
      tx.addMemo(Memo.text(memo));
    }

    const preparedTransaction = await server.prepareTransaction(
      tx.build(),
      networkPassphrase
    );

    return preparedTransaction.toXDR();
  } catch (err) {
    console.log("err");
    return "error";
  }
};

export const getEstimatedFee = async (
  tokenId: string,
  quantity: number,
  destinationPubKey: string,
  memo: string,
  txBuilder: TransactionBuilder,
  server: Server
) => {
  const contract = new Contract(tokenId);
  const tx = txBuilder
    .addOperation(
      contract.call(
        "mint",
        ...[
          accountToScVal(destinationPubKey), // to
          numberToI128(quantity), // quantity
        ]
      )
    )
    .setTimeout(TimeoutInfinite);

  if (memo.length > 0) {
    tx.addMemo(Memo.text(memo));
  }

  const raw = tx.build();

  const simResponse = await server.simulateTransaction(raw);
  if ("error" in simResponse) {
    throw simResponse.error;
  }

  if (!("result" in simResponse)) {
    throw new Error("transaction simulation failed");
  }

  // 'classic' tx fees are measured as the product of tx.fee * 'number of operations', In soroban contract tx,
  // there can only be single operation in the tx, so can make simplification
  // of total classic fees for the soroban transaction will be equal to incoming tx.fee + minResourceFee.
  const classicFeeNum = parseInt(raw.fee, 10) || 0;
  const minResourceFeeNum = parseInt(simResponse.minResourceFee, 10) || 0;
  const fee = (classicFeeNum + minResourceFeeNum).toString();
  return fee;
};