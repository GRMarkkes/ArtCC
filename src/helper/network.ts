import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

// Soroban is only supported on Futurenet right now
export const FUTURENET_DETAILS = {
  network: "PUBLIC",
  networkUrl: "https://still-magical-meadow.stellar-mainnet.quiknode.pro/c4ad23482bb8b07d64af9498be18ffdd3d7aca53",
  networkPassphrase: "Public Global Stellar Network ; September 2015",
};

export const signTx = async (
  xdr: string,
  publicKey: string,
  kit: StellarWalletsKit,
) => {
  const { signedXDR } = await kit.sign({
    xdr,
    publicKey,
  });
  return signedXDR;
};