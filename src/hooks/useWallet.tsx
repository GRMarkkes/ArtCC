import { NetworkDetails, signTx } from "../helper/network";
import {
  createNewCampaign,
  donateToCampaignByID,
  getCampaignById,
  getCampaigns,
  getServer,
  getTokenBalance,
  getTokenName,
  getTxBuilder,
  submitTx,
} from "../helper/soroban";
import { useCallback, useEffect, useState } from "react";

import { BASE_FEE } from "soroban-client";
import { Campaign } from "../../crowdfund/dist/types";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

const NATIVE_TOKEN = import.meta.env.VITE_NATIVE_TOKEN || "";
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
      try {
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
        await getDetails(pubKey);
      } catch (error) {
        throw error;
      }
    },
    [pubKey, swkKit, networkDetails]
  );

  const getDetails = useCallback(
    async (key: string) => {
      setLoading(true);
      const server = getServer(networkDetails);

      await getCampaignList(false);
      {
        const txBuilder = await getTxBuilder(
          key,
          BASE_FEE,
          server,
          networkDetails.networkPassphrase
        );
        const balance = await getTokenBalance(
          pubKey,
          contractIdToken,
          txBuilder,
          server
        );
        setBalance(balance);
      }
      {
        const txBuilder = await getTxBuilder(
          key,
          BASE_FEE,
          server,
          networkDetails.networkPassphrase
        );
        const tokenName = await getTokenName(
          contractIdToken,
          txBuilder,
          server
        );
        setTokenName(tokenName);
      }
      {
        const txBuilder = await getTxBuilder(
          key,
          BASE_FEE,
          server,
          networkDetails.networkPassphrase
        );
        const tokenSymbol = await getTokenName(
          contractIdToken,
          txBuilder,
          server
        );
        setTokenSymbol(tokenSymbol);
      }
      setLoading(false);
    },
    [pubKey, swkKit, networkDetails]
  );

  const getSingleCampaign = useCallback(
    async (id: number) => {
      const server = getServer(networkDetails);
      const txBuilder = await getTxBuilder(
        pubKey,
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
          pubKey,
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
    if (!pubKey) return;
    getDetails(pubKey);
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
