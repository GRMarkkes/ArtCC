import { ModuleInterface, ModuleType, WalletNetwork } from '../../types';
export declare const FREIGHTER_ID = "freighter";
export declare class FreighterModule implements ModuleInterface {
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
        publicKey: string;
    }): Promise<{
        result: string;
    }>;
    signAuthEntry(params: {
        entryPreimageXDR: string;
        publicKey: string;
    }): Promise<{
        result: string;
    }>;
}
//# sourceMappingURL=freighter.module.d.ts.map