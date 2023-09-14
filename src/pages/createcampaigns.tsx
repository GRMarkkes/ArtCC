// import React, { useEffect } from "react";
import { StellarWalletsKit } from "stellar-wallets-kit";

import { BASE_FEE } from "soroban-client";

import * as crowdFund from "CrowdFund";
import { NetworkDetails, signTx } from "../helper/network";
import { getServer, submitTx, getTxBuilder, createNewCampaign, donateToCampaignByID } from "../helper/soroban";

import { useAccount } from "../hooks";

const NATIVE_TOKEN = "CB64D3G7SM2RTH6JSGG34DDTFTQ5CFDKVDZJZSODMCX4NJ2HV2KN7OHT";

interface CreateCampaignsProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const CreateCampaigns = (props: CreateCampaignsProps) => {
  const { data: account } = useAccount();
  console.log("account: ", account?.address);

  async function createCampaign() {
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
  }

  async function donateToCampaign() {
    console.log("donateToCampaign");

    const server = getServer(props.networkDetails);
    // Gets a transaction builder and use it to add a "swap" operation and build the corresponding XDR
    const txBuilder = await getTxBuilder(props.pubKey, "1000000", server, props.networkDetails.networkPassphrase);

    const { preparedTransaction, footprint } = await donateToCampaignByID(
      crowdFund.CONTRACT_ID,
      4, // Campaign id
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
  }

  return (
    <div
      style={{
        // display: 'flex',
        justifyContent: "left",
        alignItems: "Right",
        height: "100vh",
        marginLeft: "100px",
      }}
    >
      <h1>Create Campaigns</h1>
      <button onClick={createCampaign}>Create Campaingn</button>
      <button onClick={donateToCampaign}>Donate To Campaign</button>
    </div>
  );
};

export default CreateCampaigns;
