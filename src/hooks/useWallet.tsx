/* eslint-disable @typescript-eslint/no-unused-vars */
import { NetworkDetails, signTx } from "../helper/network";
import {
  createNewCampaign,
  donateToCampaignByID,
  getCampaignById,
  getCampaigns,
  getServer,
  getTxBuilder,
  submitTx,
} from "../helper/soroban";
import * as StellarSdk from "stellar-sdk";

import { Asset } from "stellar-sdk";
import { useCallback, useEffect, useState } from "react";
import { BASE_FEE } from "soroban-client";
import { Campaign } from "../../types";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

const NATIVE_TOKEN = import.meta.env.VITE_NATIVE_TOKEN || "";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "";
const HORIZON_SERVER = import.meta.env.VITE_HORIZON_SERVER || "";
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || "";
const contractIdCrowdFund = import.meta.env.VITE_CONTRACT_CROWD_FUND_ID || "";

const contractIdToken = import.meta.env.VITE_CONTRACT_TOKEN_ID || "";

type Props = {
  networkDetails: NetworkDetails;
  swkKit: StellarWalletsKit;
  pubKey: string;
};
type CreateCampaignParams = {
  title: string;
  desc: string;
  category: string;
  main_location: string;
  metaData: string;
  imageUrl: string;
  target: string;
};
export const useWallet = ({ networkDetails, pubKey, swkKit }: Props) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createloading, setCreateLoading] = useState<boolean>(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState<number>(0);

  const horizonServer = new StellarSdk.Horizon.Server(HORIZON_SERVER);

  const createCampaign = useCallback(
    async ({
      category,
      desc,
      imageUrl,
      main_location,
      metaData,
      title,
      target,
    }: CreateCampaignParams) => {
      try {
        setCreateLoading(true);
        const server = getServer(networkDetails);
        const txBuilder = await getTxBuilder(
          pubKey,
          BASE_FEE,
          server,
          networkDetails.networkPassphrase
        );
        const preparedTransaction = await createNewCampaign({
          contractID: contractIdCrowdFund,
          artistPubKey: pubKey,
          title,
          desc,
          category,
          main_location,
          metaData,
          imageUrl,
          target,
          deadline: "1776398614",
          memo: "",
          txBuilderC: txBuilder,
          server: server,
          networkPassphrase: networkDetails.networkPassphrase,
        });
        const signedTx = await signTx(preparedTransaction, pubKey, swkKit);
        await submitTx(signedTx, networkDetails.networkPassphrase, server);
        await getDetails(pubKey);
        setCreateLoading(false);
      } catch (error) {
        setCreateLoading(false);
        throw error;
      }
    },
    [pubKey, swkKit, networkDetails]
  );

  const donateToCampaign = useCallback(
    async (id: number, amount: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        setLoading(true);
        const issuingKeys = StellarSdk.Keypair.fromSecret(SECRET_KEY);

        const trustAssetVal = new Asset("ARTY", issuingKeys.publicKey());

        await trustAsset({
          source: issuingKeys.publicKey(),
          asset: trustAssetVal,
          limit: parseInt(amount) + 1000,
        });

        const server = getServer(networkDetails);
        const txBuilder = await getTxBuilder(
          pubKey,
          "1000000",
          server,
          networkDetails.networkPassphrase
        );
        const preparedTransaction = await donateToCampaignByID({
          contractID: contractIdCrowdFund,
          id, // Campaign id
          donorPubKey: pubKey, // Donor public key
          amount, // amount to donate
          nativeToken: NATIVE_TOKEN, // XLM Native Addresss
          memo: "",
          txBuilderC: txBuilder,
          server: server,
          networkPassphrase: networkDetails.networkPassphrase,
        });
        const signedTx = await signTx(preparedTransaction, pubKey, swkKit);
        await submitTx(signedTx, networkDetails.networkPassphrase, server);

        await sendPayment({
          issuerKeys: issuingKeys,
          asset: trustAssetVal,
          amount: amount,
        });

        setLoading(false);

        await getDetails(pubKey);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    [pubKey, swkKit, networkDetails]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const trustAsset = async ({ source, asset, limit }) => {
    try {
      const receiverAccount = await horizonServer.loadAccount(pubKey);
      const transaction = new StellarSdk.TransactionBuilder(receiverAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.PUBLIC,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: asset,
            limit: limit.toString(),
          })
        )
        .setTimeout(100)
        .build();

      const signedTx = await signTx(transaction?.toXDR(), pubKey, swkKit);
      const server = getServer(networkDetails);

      const submitTran = await submitTx(
        signedTx,
        networkDetails.networkPassphrase,
        server
      );

      console.log("Trustline established successfully.");
    } catch (error) {
      console.error("Error establishing trustline:", error);
    }
  };

  const sendPayment = async ({ issuerKeys, asset, amount }) => {
    try {
      const issuerAccount = await horizonServer.loadAccount(
        issuerKeys.publicKey()
      );

      const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.PUBLIC,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: pubKey,
            asset: asset,
            amount: amount.toString(),
          })
        )
        .setTimeout(100)
        .build();

      await transaction.sign(issuerKeys);

      await horizonServer.submitTransaction(transaction);
      console.log("Payment sent successfully.");
    } catch (error) {
      console.error("Error sending payment:", error);
      setLoading(false);
    }
  };

  const getDetails = useCallback(
    async (key: string) => {
      setLoading(true);
      const server = getServer(networkDetails);

      await getCampaignList(false);

      {
        // const txBuilder = await getTxBuilder(
        //   key,
        //   BASE_FEE,
        //   server,
        //   networkDetails.networkPassphrase
        // );
        // const tokenName = await getTokenName(
        //   contractIdToken,
        //   txBuilder,
        //   server
        // );
        // setTokenName(tokenName);
      }
      {
        // const txBuilder = await getTxBuilder(
        //   key,
        //   BASE_FEE,
        //   server,
        //   networkDetails.networkPassphrase
        // );
        // const tokenSymbol = await getTokenName(
        //   contractIdToken,
        //   txBuilder,
        //   server
        // );
        // setTokenSymbol(tokenSymbol);
      }

      {
        if (!pubKey) return setLoading(false);
        // const txBuilder = await getTxBuilder(
        //   key,
        //   BASE_FEE,
        //   server,
        //   networkDetails.networkPassphrase
        // );
        // const balance = await getTokenBalance(
        //   pubKey,
        //   contractIdToken,
        //   txBuilder,
        //   server
        // );
        // setBalance(balance);
      }
      setLoading(false);
    },
    [pubKey, swkKit, networkDetails]
  );

  const getSingleCampaign = useCallback(
    async (id: number) => {
      const server = getServer(networkDetails);
      const txBuilder = await getTxBuilder(
        pubKey || PUBLIC_KEY,
        BASE_FEE,
        server,
        networkDetails.networkPassphrase
      );
      const data = await getCampaignById(
        contractIdCrowdFund,
        id,
        txBuilder,
        server
      );
      return data;
    },
    [pubKey, swkKit, networkDetails]
  );

  const getCampaignList = useCallback(
    async (handleLoading = true) => {
      try {
        handleLoading && setLoading(true);
        const server = getServer(networkDetails);
        const txBuilder = await getTxBuilder(
          pubKey || PUBLIC_KEY,
          BASE_FEE,
          server,
          networkDetails.networkPassphrase
        );
        const data = await getCampaigns(contractIdCrowdFund, txBuilder, server);
        setCampaigns(data);
        handleLoading && setLoading(false);
      } catch (error) {
        handleLoading && setLoading(false);
        throw error;
      }
    },
    [pubKey, swkKit, networkDetails]
  );
  useEffect(() => {
    getDetails(pubKey || PUBLIC_KEY);
  }, [pubKey, swkKit, networkDetails]);

  return {
    campaigns,
    tokenName,
    tokenSymbol,
    loading,
    tokenAddress: contractIdToken,
    balance,
    selectedNetwork: networkDetails,
    createloading,
    donateToCampaign,
    getCampaignById: getSingleCampaign,
    createCampaign,
    getCampaigns: getCampaignList,
  };
};
