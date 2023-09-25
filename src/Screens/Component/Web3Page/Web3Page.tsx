import { useEffect, useState } from "react";
import * as Crowdfund from "CrowdFund";
import * as Token from "token";
import { BASE_FEE, Address } from "soroban-client";

import { StellarWalletsKit } from "stellar-wallets-kit";
import { NetworkDetails, signTx } from "../../../helper/network";
import {
  getServer,
  submitTx,
  getTxBuilder,
  createNewCampaign,
  donateToCampaignByID,
} from "../../../helper/soroban";

const NATIVE_TOKEN = "CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT";

const networkUrl = "https://rpc-futurenet.stellar.org:443";

const contractIdCrowdFund =
  "CDYEIAFYOU7SUTV4JJCESIJDUYCQGNDMDK7LK5TOBZ7MKDGSVGI3ZDX6";

const crowdFund = new Crowdfund.Contract({
  contractId: contractIdCrowdFund,
  networkPassphrase: "Test SDF Future Network ; October 2022",
  rpcUrl: networkUrl,
});

const contractIdToken =
  "CBEBCROGH2E35N7CXZKCOPPMOBOYJKVUFLYAPMB76JUAALV5K2SVETPR";

const token = new Token.Contract({
  contractId: "CBEBCROGH2E35N7CXZKCOPPMOBOYJKVUFLYAPMB76JUAALV5K2SVETPR",
  networkPassphrase: "Test SDF Future Network ; October 2022",
  rpcUrl: networkUrl,
});

interface Web3PageProps {
  networkDetails: NetworkDetails;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

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

      const preparedTransaction = await createNewCampaign({
        contractID: contractIdCrowdFund,
        artistPubKey: props.pubKey,
        title: "Food Campaign",
        desc: "Fund to Food Campaign",
        imageUrl: "image url food",
        target: "5000",
        deadline: "1700613645",
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
        console.log(error);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function getCampaings() {
    try {
      // console.log("getCampaings");
      // console.log("props.pubKey", props.pubKey);

      let data = await crowdFund.getCampaigns();

      setCampaigns(data);

      // console.log(data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function tokenDetail() {
    try {
      let tokenName = await token.name();
      token.symbol().then(setTokenSymbol);

      let publicKey = new Address(props.pubKey);

      let balance = await token.balance({ id: publicKey });

      let formatted_balance = Number(balance) / 100000000;

      setBalance(formatted_balance);

      setTokenName(tokenName);
      setTokenAddress(contractIdToken);

      // console.log(token.options.contractId);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    getCampaings();
    tokenDetail();
  });

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
