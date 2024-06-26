import { ModuleInterface, ModuleType, WalletNetwork } from '../../types';
export declare const LOBSTR_ID = "lobstr";
export declare class LobstrModule implements ModuleInterface {
    moduleType: ModuleType;
    productId: string;
    productName: string;
    productUrl: string;
    productIcon: string;
    isAvailable(): Promise<boolean>;
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
}
//# sourceMappingURL=lobstr.module.d.ts.map