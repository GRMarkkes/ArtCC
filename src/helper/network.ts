import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

// Soroban is only supported on Futurenet right now
export const FUTURENET_DETAILS = {
  network: "PUBLIC",
  networkUrl:
    "https://mainnet.stellar.validationcloud.io/v1/TfG9-m1TsFivRBylmjcE2Xw_GeWb9yV7wOcx1MgilH4",
  networkPassphrase: "Public Global Stellar Network ; September 2015",
};

export const signTx = async (
  xdr: string,
  publicKey: string,
  kit: StellarWalletsKit
) => {
  const { signedXDR } = await kit.sign({
    xdr,
    publicKey,
  });
  return signedXDR;
};
