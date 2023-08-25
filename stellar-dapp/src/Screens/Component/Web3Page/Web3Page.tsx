import { useEffect, useState } from "react";
import * as crowdFund from "CrowdFund";
import * as token from "token";
import { BASE_FEE } from "soroban-client";

import { StellarWalletsKit } from "stellar-wallets-kit";
import { NetworkDetails, signTx } from "../../../helper/network";
import { getServer, submitTx, getTxBuilder, createNewCampaign, donateToCampaignByID } from "../../../helper/soroban";

const NATIVE_TOKEN = "CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT";

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

export type u32 = number;
export type i32 = number;
export type u64 = bigint;
export type i64 = bigint;
export type u128 = bigint;
export type i128 = bigint;
export type u256 = bigint;
export type i256 = bigint;
export type Address = string;
export type Option<T> = T | undefined;
export type Typepoint = bigint;
export type Duration = bigint;

type Campaign = {
  amount_collected: i128;
  deadline: u64;
  description: string;
  donations: Array<i128>;
  donators: Array<Address>;
  id: u32;
  image: string;
  owner: Address;
  status: boolean;
  target: i128;
  title: string;
};

const Web3Page = (props: Web3PageProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [balance, setBalance] = useState(0);

  async function createCampaign() {
    try {
      console.log("create campaign");

      const server = getServer(props.networkDetails);
      // Gets a transaction builder and use it to add a "swap" operation and build the corresponding XDR
      const txBuilder = await getTxBuilder(props.pubKey, BASE_FEE, server, props.networkDetails.networkPassphrase);

      const { preparedTransaction, footprint } = await createNewCampaign(
        crowdFund.CONTRACT_ID,
        props.pubKey,
        "Food Campaign",
        "Fund to Food Campaign",
        "image url food",
        "5000",
        "1694745533",
        "",
        server,
        props.networkDetails.networkPassphrase,
        txBuilder
      );

      console.log("footprint", footprint);
      console.log("preparedTransaction", preparedTransaction);

      const _signedXdr = await signTx(preparedTransaction.toXDR(), props.pubKey, props.swkKit);

      try {
        const result = await submitTx(_signedXdr, props.networkDetails.networkPassphrase, server);

        console.log("result", result);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function donateToCampaign() {
    try {
      console.log("donateToCampaign");

      const server = getServer(props.networkDetails);
      // Gets a transaction builder and use it to add a "swap" operation and build the corresponding XDR
      const txBuilder = await getTxBuilder(props.pubKey, "1000000", server, props.networkDetails.networkPassphrase);

      const { preparedTransaction, footprint } = await donateToCampaignByID(
        crowdFund.CONTRACT_ID,
        2, // Campaign id
        props.pubKey, // Donor public key
        "200", // amount to donate
        NATIVE_TOKEN, // XLM Native Addresss
        "",
        server,
        props.networkDetails.networkPassphrase,
        txBuilder
      );

      console.log("footprint", footprint);
      console.log("preparedTransaction", preparedTransaction);

      const _signedXdr = await signTx(preparedTransaction.toXDR(), props.pubKey, props.swkKit);

      try {
        const result = await submitTx(_signedXdr, props.networkDetails.networkPassphrase, server);

        console.log("result", result);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function getCampaings() {
    try {
      console.log("getCampaings");
      console.log("crowdFund.CONTRACT_ID", crowdFund.CONTRACT_ID);
      console.log("props.pubKey", props.pubKey);

      let data = await crowdFund.getCampaigns();

      setCampaigns(data);

      console.log(data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function tokenDetail() {
    try {
      let name = await token.name();
      let symbol = await token.symbol();

      let balance = await token.balance({ id: props.pubKey });
      let formatted_balance = Number(balance) / 100000000;

      setBalance(formatted_balance);

      setTokenName(name);
      setTokenSymbol(symbol);
      setTokenAddress(token.CONTRACT_ID);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(crowdFund.CONTRACT_ID);
    getCampaings();
    tokenDetail();
  });

  return (
    <div>
      <div style={{ marginBottom: "5%" }}>Connected Wallet Address: {props.pubKey}</div>
      <h3>Token Detail</h3>
      <h4>Token Name: {tokenName}</h4>
      <h4>Symbol: {tokenSymbol}</h4>
      <h5>Token Contract Address: {tokenAddress}</h5>
      <h3>
        Balance: {balance} {tokenSymbol}
      </h3>
      <div>
        <h1>Create Campaign</h1>
        <button onClick={createCampaign} className="btn btn-primary" style={{ marginTop: "3%", marginBottom: "4%" }}>
          Create Campaign
        </button>
      </div>

      <div>
        <h1>Donate To Campaign</h1>
        <button onClick={donateToCampaign} className="btn btn-primary" style={{ marginTop: "3%", marginBottom: "4%" }}>
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
            <h5>Donators: [ {campaign.donators} ]</h5>
            <h5>Owner: {campaign.owner}</h5>
            <h5>----------------------------------------------------------------------</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Web3Page;
