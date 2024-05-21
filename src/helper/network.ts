import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

// Soroban is only supported on Futurenet right now
export const FUTURENET_DETAILS = {
  network: import.meta.env.VITE_NETWORK_NEW,
  networkUrl: import.meta.env.VITE_NETWORK_URL_NEW,
  networkPassphrase: import.meta.env.VITE_NETWORK_PASSPHRASE_NEW,
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
