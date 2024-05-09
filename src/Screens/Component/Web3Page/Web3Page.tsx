import * as Crowdfund from "CrowdFund";

import {
  FUTURENET_DETAILS,
  NetworkDetails,
  signTx,
} from "../../../helper/network";
import {
  createNewCampaign,
  donateToCampaignByID,
  getCampaigns as getCampaignsFromServer,
  getServer,
  getTokenBalance,
  getTokenName,
  getTokenSymbol,
  getTxBuilder,
  submitTx,
} from "../../../helper/soroban";
import { useCallback, useEffect, useState } from "react";

import { BASE_FEE } from "soroban-client";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

// import * as Token from "token";

const NATIVE_TOKEN = "CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT";

// const networkUrl = "https://rpc-futurenet.stellar.org";

const contractIdCrowdFund =
  "CARS7VK2FA2EDVOI446XSJSGXHDIU4D3GPWCDQ6OJZR7U3C3D6F7M4EX";

// const crowdFund = new Crowdfund.Contract({
//   contractId: contractIdCrowdFund,
//   networkPassphrase: "Test SDF Future Network ; October 2022",
//   rpcUrl: networkUrl,
// });

const contractIdToken =
  "CCEHX6Q3A6TOQTGQXR6OGFZ3LODD7EEFX67667FAXD3AHQ4Z6B6VLQNM";

// const token = new Token.Contract({
//   contractId: contractIdToken,
//   networkPassphrase: "Test SDF Future Network ; October 2022",
//   rpcUrl: networkUrl,
// });

interface Web3PageProps {
  networkDetails: NetworkDetails;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const dataTransform = (data: string, key: string): string => {
  try {
    let dataObj = JSON.parse(data);

    return dataObj[key] || "";
  } catch (error) {
    return data;
  }
};
const Web3Page = (props: Web3PageProps) => {
  const [campaigns, setCampaigns] = useState<Crowdfund.Campaign[]>([]);
  const [selectedNetwork] = useState(FUTURENET_DETAILS);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress] = useState("");
  const [balance, setBalance] = useState<number | string>(0);

  async function createCampaign() {
    try {
      console.log(
        "create campaign",
        props.networkDetails,
        JSON.stringify(props, null, 2)
      );

      const server = getServer(props.networkDetails);
      console.log("🚀 ~ createCampaign ~ server:", server);

      console.log("get server", JSON.stringify(server, null, 2));

      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        props.networkDetails.networkPassphrase
      );

      console.log("create txBuilder", txBuilder);

      const preparedTransaction = await createNewCampaign({
        contractID: contractIdCrowdFund,
        artistPubKey: props.pubKey,
        title: "Food Campaign",
        desc: "Fund to Food Campaign",
        category: "Art",
        main_location: "lahore",
        metaData: "{}",
        imageUrl: "image url food",
        target: "5000",
        deadline: "1776398614",
        memo: "",
        txBuilderC: txBuilder,
        // category: "Art",
        server: server,
        networkPassphrase: props.networkDetails.networkPassphrase,
      });

      console.log("preparedTransaction", preparedTransaction);

      const signedTx = await signTx(
        preparedTransaction,
        props.pubKey,
        props.swkKit
      );

      const result = await submitTx(
        signedTx,
        props.networkDetails.networkPassphrase,
        server
      );

      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  }

  async function donateToCampaign() {
    try {
      console.log("donateToCampaign");
      const server = getServer(props.networkDetails);
      // Gets a transaction builder and use it to add a "swap" operation and build the corresponding XDR
      const txBuilder = await getTxBuilder(
        props.pubKey,
        "1000000",
        server,
        props.networkDetails.networkPassphrase
      );
      const preparedTransaction = await donateToCampaignByID({
        contractID: contractIdCrowdFund,
        id: 1, // Campaign id
        donorPubKey: props.pubKey, // Donor public key
        amount: "25", // amount to donate
        nativeToken: NATIVE_TOKEN, // XLM Native Addresss
        memo: "",
        txBuilderC: txBuilder,
        server: server,
        networkPassphrase: props.networkDetails.networkPassphrase,
      });
      console.log("preparedTransaction", preparedTransaction);
      try {
        const signedTx = await signTx(
          preparedTransaction,
          props.pubKey,
          props.swkKit
        );
        const result = await submitTx(
          signedTx,
          props.networkDetails.networkPassphrase,
          server
        );
        console.log("result", result);
      } catch (error) {
        // console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getCampaigns = useCallback(async () => {
    try {
      const server = getServer(selectedNetwork);
      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        selectedNetwork.networkPassphrase
      );
      const data = await getCampaignsFromServer(
        contractIdCrowdFund,
        txBuilder,
        server
      );
      setCampaigns(data);

      //   console.log("getCampaigns");
      //   console.log("props.pubKey", props.pubKey);
      //   let data = await crowdFund.getCampaigns();
      //   const campaignsData = data.result;
      //   setCampaigns(campaignsData);
      //   // console.log(data);
    } catch (error) {
      //   // Handle errors here
      //   console.error(error);
    }
  }, [props.pubKey, selectedNetwork]);

  const tokenDetail = useCallback(async () => {
    try {
      const server = getServer(selectedNetwork);
      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        selectedNetwork.networkPassphrase
      );
      const symbol = await getTokenSymbol(contractIdToken, txBuilder, server);
      console.log("🚀 ~ tokenDetail ~ symbol:", symbol);
      setTokenSymbol(symbol);
      // let tokenName = await token.name();
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:171 ~ tokenDetail ~ tokenName:",
      //   tokenName
      // );
      // const assembledTx = await token.symbol();
      // const symbolValue = assembledTx.result;
      // setTokenSymbol(symbolValue);

      // let publicKey = new Address(props.pubKey);
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ props.pubKey:",
      //   props.pubKey
      // );
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ publicKey:",
      //   publicKey
      // );

      // let balance = await token.balance({ id: publicKey.toString() });
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:188 ~ tokenDetail ~ balance:",
      //   balance
      // );

      // let formatted_balance = Number(balance) / 100000000;

      // setBalance(formatted_balance);
      // const tokenNameIs = tokenName.result;
      // setTokenName(tokenNameIs);
      // setTokenAddress(contractIdToken);

      // console.log(token.options.contractId);
    } catch (error) {
      console.log("🚀 ~ tokenDetail ~ error:", error);
      // console.log(error);
    }
  }, [props.pubKey, selectedNetwork]);

  const getName = useCallback(async () => {
    try {
      const server = getServer(selectedNetwork);
      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        selectedNetwork.networkPassphrase
      );
      const name = await getTokenName(contractIdToken, txBuilder, server);
      console.log("🚀 ~ getName ~ name:", name);
      setTokenName(name);
      // let tokenName = await token.name();
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:171 ~ tokenDetail ~ tokenName:",
      //   tokenName
      // );
      // const assembledTx = await token.symbol();
      // const symbolValue = assembledTx.result;
      // setTokenSymbol(symbolValue);

      // let publicKey = new Address(props.pubKey);
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ props.pubKey:",
      //   props.pubKey
      // );
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ publicKey:",
      //   publicKey
      // );

      // let balance = await token.balance({ id: publicKey.toString() });
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:188 ~ tokenDetail ~ balance:",
      //   balance
      // );

      // let formatted_balance = Number(balance) / 100000000;

      // setBalance(formatted_balance);
      // const tokenNameIs = tokenName.result;
      // setTokenName(tokenNameIs);
      // setTokenAddress(contractIdToken);

      // console.log(token.options.contractId);
    } catch (error) {
      console.log("🚀 ~ name ~ error:", error);
      // console.log(error);
    }
  }, [props.pubKey, selectedNetwork]);

  const getBalance = useCallback(async () => {
    try {
      const server = getServer(selectedNetwork);
      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        selectedNetwork.networkPassphrase
      );
      const balance = await getTokenBalance(
        props.pubKey,
        contractIdToken,
        txBuilder,
        server
      );
      setBalance(balance);

      // let tokenName = await token.name();
      console.log(
        "🚀 ~ file: Web3Page.tsx:171 ~ tokenDetail ~ balance:",
        balance
      );
      // const assembledTx = await token.symbol();
      // const symbolValue = assembledTx.result;
      // setTokenSymbol(symbolValue);

      // let publicKey = new Address(props.pubKey);
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ props.pubKey:",
      //   props.pubKey
      // );
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ publicKey:",
      //   publicKey
      // );

      // let balance = await token.balance({ id: publicKey.toString() });
      // console.log(
      //   "🚀 ~ file: Web3Page.tsx:188 ~ tokenDetail ~ balance:",
      //   balance
      // );

      // let formatted_balance = Number(balance) / 100000000;

      // setBalance(formatted_balance);
      // const tokenNameIs = tokenName.result;
      // setTokenName(tokenNameIs);
      // setTokenAddress(contractIdToken);

      // console.log(token.options.contractId);
    } catch (error) {
      console.log("🚀 ~ name ~ error:", error);
      // console.log(error);
    }
  }, [props.pubKey, selectedNetwork]);
  useEffect(() => {
    getBalance();
  }, [getBalance]);
  useEffect(() => {
    getName();
  }, [getName]);
  useEffect(() => {
    getCampaigns();
    tokenDetail();
  }, [getCampaigns, tokenDetail]); // Use an array of dependencies here

  return (
    <div>
      <div style={{ marginBottom: "5%" }}>
        Connected Wallet Address: {props.pubKey}
      </div>
      <h3>Token Detail</h3>
      <h4>Token Name: {tokenName}</h4>
      <h4>Symbol: {tokenSymbol}</h4>
      <h5>Token Contract Address: {tokenAddress}</h5>
      <h3>
        Balance: {balance} {tokenSymbol}
      </h3>
      <div>
        <h1>Create Campaign</h1>
        <button
          onClick={createCampaign}
          className="btn btn-primary"
          style={{ marginTop: "3%", marginBottom: "4%" }}
        >
          Create Campaign
        </button>
      </div>

      <div>
        <h1>Donate To Campaign</h1>
        <button
          onClick={donateToCampaign}
          className="btn btn-primary"
          style={{ marginTop: "3%", marginBottom: "4%" }}
        >
          Donate To Campaign
        </button>
      </div>

      <h1>All Campaigns</h1>
      <div>
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <h2>ID: {campaign.id}</h2>
            <h2>Title: {campaign.title}</h2>
            <h4>Image URL: {campaign.image}</h4>
            <h4>Description: {campaign.description}</h4>
            <h4>Deadline: {campaign.deadline.toString()}</h4>
            <h4>Target: {campaign.target.toString()}</h4>
            <h4>Total donation: {campaign.donations.toString()}</h4>
            <h5>Donators: [ {campaign.donators.toString()} ]</h5>
            <h5>Owner: {campaign.owner.toString()}</h5>
            <h5>Cateogry: {campaign.category.toString()}</h5>
            <h5>Date: {dataTransform(campaign.category, "category2")}</h5>
            <h5>
              Creater Name: {dataTransform(campaign.category, "category3")}
            </h5>
            <h5>
              ----------------------------------------------------------------------
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Web3Page;
