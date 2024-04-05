import { useCallback, useEffect, useState } from "react";
import * as Crowdfund from "CrowdFund";
import * as Token from "token";
import { BASE_FEE, Address } from "soroban-client";

import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { NetworkDetails, signTx } from "../../../helper/network";
import {
  getServer,
  submitTx,
  getTxBuilder,
  createNewCampaign,
  donateToCampaignByID,
} from "../../../helper/soroban";

const NATIVE_TOKEN = "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA";

const networkUrl = "https://still-magical-meadow.stellar-mainnet.quiknode.pro/c4ad23482bb8b07d64af9498be18ffdd3d7aca53";

const contractIdCrowdFund =
  "CBYMFAAA3OIFXXBHH7C2JKXDCNB547VGZSURPUPFDDSF2MBNYKJUZXMB";

const crowdFund = new Crowdfund.Contract({
  contractId: contractIdCrowdFund,
  networkPassphrase: "Public Global Stellar Network ; September 2015",
  rpcUrl: networkUrl,
});

const contractIdToken =
  "CAMPH7W5NXSV643YAQTJX6O76G6DGSEL6TWB2HOB6QCHXALN67ZUQTHP";

const token = new Token.Contract({
  contractId: contractIdToken,
  networkPassphrase: "Public Global Stellar Network ; September 2015",
  rpcUrl: networkUrl,
});

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

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function createCampaign() {
    try {
      console.log("create campaign");

      const server = getServer(props.networkDetails);

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
        date: "1700613645",
        imageUrl: "image url food",
        target: "5000",
        deadline: "1700613645",
        memo: "",
        txBuilderC: txBuilder,
        // category: "Art",
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
      // console.log(error);
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
        amount: "150", // amount to donate
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
      // console.log(error);
    }
  }
  const getCampaigns = useCallback(async () => {
    try {
      console.log("getCampaigns");
      console.log("props.pubKey", props.pubKey);

      let data = await crowdFund.getCampaigns();
      const campaignsData = data.result; 

      
      setCampaigns(campaignsData);

      // console.log(data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  }, [props.pubKey]);

  const tokenDetail = useCallback(async () => {
    try {
      let tokenName = await token.name();
      console.log(
        "🚀 ~ file: Web3Page.tsx:171 ~ tokenDetail ~ tokenName:",
        tokenName
      );
      const assembledTx = await token.symbol();
      const symbolValue = assembledTx.result;
      setTokenSymbol(symbolValue);

      let publicKey = new Address(props.pubKey);
      console.log(
        "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ props.pubKey:",
        props.pubKey
      );
      console.log(
        "🚀 ~ file: Web3Page.tsx:174 ~ tokenDetail ~ publicKey:",
        publicKey
      );

      let balance = await token.balance({ id: publicKey.toString() });
      console.log(
        "🚀 ~ file: Web3Page.tsx:188 ~ tokenDetail ~ balance:",
        balance
      );

      let formatted_balance = Number(balance) / 100000000;

      setBalance(formatted_balance);
      const tokenNameIs = tokenName.result;
      setTokenName(tokenNameIs);
      setTokenAddress(contractIdToken);

      // console.log(token.options.contractId);
    } catch (error) {
      // console.log(error);
    }
  }, [props.pubKey]);

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
            <h5>Creater Name: {dataTransform(campaign.category, "category3")}</h5>
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
