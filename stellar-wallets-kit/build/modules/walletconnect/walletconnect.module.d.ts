import { ModuleInterface, ModuleType, WalletNetwork } from '../../types';
export interface IParsedWalletConnectSession {
    id: string;
    name: string;
    description: string;
    url: string;
    icons: string;
    accounts: Array<{
        network: 'pubnet' | 'testnet';
        publicKey: string;
    }>;
}
export declare const WALLET_CONNECT_ID = "wallet_connect";
export declare class WalletConnectModule implements ModuleInterface {
    wcParams: IWalletConnectConstructorParams;
    moduleType: ModuleType;
    productId: string;
    productName: string;
    productUrl: string;
    productIcon: string;
    private client?;
    private activeSession?;
    private qrModal;
    isAvailable(): Promise<boolean>;
    constructor(wcParams: IWalletConnectConstructorParams);
    getPublicKey(): Promise<string>;
    signTx(params: {
        xdr: string;
        publicKeys: string[];
        network: WalletNetwork;
    }): Promise<{
        result: string;
    }>;
    signBlob(params: {
        blob: string;
        publicKey?: string;
    }): Promise<{
        result: string;
    }>;
    signAuthEntry(params: {
        entryPreimageXDR: string;
        publicKey?: string;
    }): Promise<{
        result: string;
    }>;
    /**
     * Allows manually setting the current active session to be used in the kit when doing WalletConnect requests
     *
     * @param sessionId The session ID is a placeholder for the session "topic", term used in WalletConnect
     * */
    setSession(sessionId: string): void;
    onSessionDeleted(cb: (sessionId: string) => void): void;
    connectWalletConnect(): Promise<IParsedWalletConnectSession>;
    closeSession(sessionId: string, reason?: string): Promise<void>;
    getSessions(): Promise<IParsedWalletConnectSession[]>;
    private getTargetSession;
}
export interface IWalletConnectConstructorParams {
    projectId: string;
    name: string;
    description: string;
    url: string;
    icons: string[];
    method: WalletConnectAllowedMethods;
    network: WalletNetwork;
    sessionId?: string;
}
export declare enum WalletConnectTargetChain {
    PUBLIC = "stellar:pubnet",
    TESTNET = "stellar:testnet"
}
export declare enum WalletConnectAllowedMethods {
    SIGN = "stellar_signXDR",
    SIGN_AND_SUBMIT = "stellar_signAndSubmitXDR"
}
//# sourceMappingURL=walletconnect.module.d.ts.map