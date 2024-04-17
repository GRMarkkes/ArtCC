import { LitElement } from 'lit';
import { ISupportedWallet } from '../types';
export declare class StellarWalletsModal extends LitElement {
    static styles: import("lit").CSSResult[];
    showModal: boolean;
    closingModal: boolean;
    modalTitle: string;
    notAvailableText: string;
    allowedWallets: ISupportedWallet[];
    modalDialogStyles: {
        zIndex: number;
    };
    connectedCallback(): void;
    closeModal(): Promise<void>;
    pickWalletOption(option: ISupportedWallet): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'stellar-wallets-modal': StellarWalletsModal;
    }
}
//# sourceMappingURL=stellar-wallets-modal.d.ts.map