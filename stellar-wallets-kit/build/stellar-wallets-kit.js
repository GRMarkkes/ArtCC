import { WalletNetwork, } from './types';
export class StellarWalletsKit {
    constructor(params) {
        this.modules = params.modules;
        this.setWallet(params.selectedWalletId);
        this.setNetwork(params.network);
    }
    /**
     * This method will return an array with all wallets supported by this kit but will let you know those the user have already installed/has access to
     * There are wallets that are by default available since they either don't need to be installed or have a fallback
     */
    async getSupportedWallets() {
        const response = [];
        for (const mod of this.modules) {
            response.push({
                id: mod.productId,
                name: mod.productName,
                type: mod.moduleType,
                icon: mod.productIcon,
                isAvailable: await mod.isAvailable(),
                url: mod.productUrl,
            });
        }
        return response;
    }
    setNetwork(network) {
        if (!Object.values(WalletNetwork).includes(network)) {
            throw new Error(`Wallet network "${network}" is not supported`);
        }
        this.network = network;
    }
    setWallet(id) {
        const target = this.modules.find((mod) => mod.productId === id);
        if (!target) {
            throw new Error(`Wallet id "${id}" is not supported`);
        }
        this.selectedWallet = target.productId;
        this.selectedModule = target;
    }
    async getPublicKey(params) {
        if (!this.selectedWallet) {
            throw new Error('Please set the wallet type first');
        }
        return this.selectedModule.getPublicKey(params);
    }
    async signTx(params) {
        if (!this.selectedWallet) {
            throw new Error('Please set the wallet type first');
        }
        return this.selectedModule.signTx(params);
    }
    async signBlob(params) {
        if (!this.selectedWallet) {
            throw new Error('Please set the wallet type first');
        }
        return this.selectedModule.signBlob(params);
    }
    async signAuthEntry(params) {
        if (!this.selectedWallet) {
            throw new Error('Please set the wallet type first');
        }
        return this.selectedModule.signAuthEntry(params);
    }
    /**
     * @deprecated - This method will be removed in future releases.
     * Use specific methods instead like signTx, signBlob, etc
     */
    async sign(params) {
        if (!this.selectedWallet) {
            throw new Error('Please set the wallet type first');
        }
        let signedXDR;
        if (params.xdr) {
            const { result } = await this.selectedModule.signTx({
                xdr: params.xdr,
                network: params.network || this.network,
                publicKeys: params.publicKey ? [params.publicKey] : [],
            });
            signedXDR = result;
        }
        else if (params.blob) {
            const { result } = await this.selectedModule.signBlob({
                blob: params.blob,
                publicKey: params.publicKey,
            });
            signedXDR = result;
        }
        else if (params.entryPreimageXDR) {
            const { result } = await this.selectedModule.signBlob({
                blob: params.entryPreimageXDR,
                publicKey: params.publicKey,
            });
            signedXDR = result;
        }
        else {
            throw new Error(`Something went wrong, make sure the parameters are correct`);
        }
        return { signedXDR };
    }
    // ---- Modal methods
    async openModal(params) {
        if (this.modalElement) {
            throw new Error(`Stellar Wallets Modal is already open`);
        }
        this.modalElement = document.createElement('stellar-wallets-modal');
        this.modalElement.setAttribute('showModal', '');
        if (params.modalDialogStyles) {
            this.modalElement.setAttribute('modalDialogStyles', JSON.stringify(params.modalDialogStyles));
        }
        const supportedWallets = await this.getSupportedWallets();
        this.modalElement.setAttribute('allowedWallets', JSON.stringify(supportedWallets));
        if (params.modalTitle) {
            this.modalElement.setAttribute('modalTitle', params.modalTitle);
        }
        if (params.notAvailableText) {
            this.modalElement.setAttribute('notAvailableText', params.notAvailableText);
        }
        document.body.appendChild(this.modalElement);
        const listener = (event) => {
            params.onWalletSelected(event.detail);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.modalElement.removeEventListener('wallet-selected', listener, false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.body.removeChild(this.modalElement);
            this.modalElement = undefined;
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.modalElement.addEventListener('wallet-selected', listener, false);
        const errorListener = (event) => {
            if (params.onClosed) {
                params.onClosed(event.detail);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.modalElement.removeEventListener('wallet-selected', listener, false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.modalElement.removeEventListener('modal-closed', errorListener, false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.body.removeChild(this.modalElement);
            this.modalElement = undefined;
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.modalElement.addEventListener('modal-closed', errorListener, false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlbGxhci13YWxsZXRzLWtpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGVsbGFyLXdhbGxldHMta2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFPTCxhQUFhLEdBQ2QsTUFBTSxTQUFTLENBQUM7QUFRakIsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUFZLE1BQStCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CO1FBQ3ZCLE1BQU0sUUFBUSxHQUF1QixFQUFFLENBQUM7UUFFeEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ1osRUFBRSxFQUFFLEdBQUcsQ0FBQyxTQUFTO2dCQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLFdBQVc7Z0JBQ3JCLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVTtnQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxXQUFXO2dCQUNyQixXQUFXLEVBQUUsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUNwQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVU7YUFDcEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU0sVUFBVSxDQUFDLE9BQXNCO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixPQUFPLG9CQUFv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QUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1RSw2REFBNkQ7WUFDN0QsYUFBYTtZQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFFRiw2REFBNkQ7UUFDN0QsYUFBYTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGVsbGFyV2FsbGV0c01vZGFsIH0gZnJvbSAnLi9tb2RhbC9zdGVsbGFyLXdhbGxldHMtbW9kYWwnO1xuaW1wb3J0IHtcbiAgSVN0ZWxsYXJXYWxsZXRzU2lnbkF1dGhFbnRyeSxcbiAgSVN0ZWxsYXJXYWxsZXRzU2lnbkJsb2IsXG4gIElTdGVsbGFyV2FsbGV0c1NpZ25UeCxcbiAgSVN1cHBvcnRlZFdhbGxldCxcbiAgS2l0QWN0aW9ucyxcbiAgTW9kdWxlSW50ZXJmYWNlLFxuICBXYWxsZXROZXR3b3JrLFxufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGVsbGFyV2FsbGV0c0tpdFBhcmFtcyB7XG4gIHNlbGVjdGVkV2FsbGV0SWQ6IHN0cmluZztcbiAgbmV0d29yazogV2FsbGV0TmV0d29yaztcbiAgbW9kdWxlczogTW9kdWxlSW50ZXJmYWNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBTdGVsbGFyV2FsbGV0c0tpdCBpbXBsZW1lbnRzIEtpdEFjdGlvbnMge1xuICBwcml2YXRlIHNlbGVjdGVkV2FsbGV0ITogc3RyaW5nO1xuICBwcml2YXRlIHNlbGVjdGVkTW9kdWxlITogTW9kdWxlSW50ZXJmYWNlO1xuICBwcml2YXRlIG5ldHdvcmshOiBXYWxsZXROZXR3b3JrO1xuICBwcml2YXRlIG1vZGFsRWxlbWVudD86IFN0ZWxsYXJXYWxsZXRzTW9kYWw7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kdWxlczogTW9kdWxlSW50ZXJmYWNlW107XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBTdGVsbGFyV2FsbGV0c0tpdFBhcmFtcykge1xuICAgIHRoaXMubW9kdWxlcyA9IHBhcmFtcy5tb2R1bGVzO1xuICAgIHRoaXMuc2V0V2FsbGV0KHBhcmFtcy5zZWxlY3RlZFdhbGxldElkKTtcbiAgICB0aGlzLnNldE5ldHdvcmsocGFyYW1zLm5ldHdvcmspO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIGFycmF5IHdpdGggYWxsIHdhbGxldHMgc3VwcG9ydGVkIGJ5IHRoaXMga2l0IGJ1dCB3aWxsIGxldCB5b3Uga25vdyB0aG9zZSB0aGUgdXNlciBoYXZlIGFscmVhZHkgaW5zdGFsbGVkL2hhcyBhY2Nlc3MgdG9cbiAgICogVGhlcmUgYXJlIHdhbGxldHMgdGhhdCBhcmUgYnkgZGVmYXVsdCBhdmFpbGFibGUgc2luY2UgdGhleSBlaXRoZXIgZG9uJ3QgbmVlZCB0byBiZSBpbnN0YWxsZWQgb3IgaGF2ZSBhIGZhbGxiYWNrXG4gICAqL1xuICBhc3luYyBnZXRTdXBwb3J0ZWRXYWxsZXRzKCk6IFByb21pc2U8SVN1cHBvcnRlZFdhbGxldFtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElTdXBwb3J0ZWRXYWxsZXRbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBtb2Qgb2YgdGhpcy5tb2R1bGVzKSB7XG4gICAgICByZXNwb25zZS5wdXNoKHtcbiAgICAgICAgaWQ6IG1vZC5wcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IG1vZC5wcm9kdWN0TmFtZSxcbiAgICAgICAgdHlwZTogbW9kLm1vZHVsZVR5cGUsXG4gICAgICAgIGljb246IG1vZC5wcm9kdWN0SWNvbixcbiAgICAgICAgaXNBdmFpbGFibGU6IGF3YWl0IG1vZC5pc0F2YWlsYWJsZSgpLFxuICAgICAgICB1cmw6IG1vZC5wcm9kdWN0VXJsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIHNldE5ldHdvcmsobmV0d29yazogV2FsbGV0TmV0d29yayk6IHZvaWQge1xuICAgIGlmICghT2JqZWN0LnZhbHVlcyhXYWxsZXROZXR3b3JrKS5pbmNsdWRlcyhuZXR3b3JrKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXYWxsZXQgbmV0d29yayBcIiR7bmV0d29ya31cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgdGhpcy5uZXR3b3JrID0gbmV0d29yaztcbiAgfVxuXG4gIHB1YmxpYyBzZXRXYWxsZXQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldDogTW9kdWxlSW50ZXJmYWNlIHwgdW5kZWZpbmVkID0gdGhpcy5tb2R1bGVzLmZpbmQoXG4gICAgICAobW9kOiBNb2R1bGVJbnRlcmZhY2UpOiBib29sZWFuID0+IG1vZC5wcm9kdWN0SWQgPT09IGlkXG4gICAgKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFdhbGxldCBpZCBcIiR7aWR9XCIgaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRXYWxsZXQgPSB0YXJnZXQucHJvZHVjdElkO1xuICAgIHRoaXMuc2VsZWN0ZWRNb2R1bGUgPSB0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UHVibGljS2V5KHBhcmFtcz86IHsgcGF0aD86IHN0cmluZyB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRXYWxsZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHNldCB0aGUgd2FsbGV0IHR5cGUgZmlyc3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE1vZHVsZS5nZXRQdWJsaWNLZXkocGFyYW1zKTtcbiAgfVxuXG4gIGFzeW5jIHNpZ25UeChwYXJhbXM6IHsgeGRyOiBzdHJpbmc7IHB1YmxpY0tleXM6IHN0cmluZ1tdOyBuZXR3b3JrOiBXYWxsZXROZXR3b3JrIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT4ge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFdhbGxldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2Ugc2V0IHRoZSB3YWxsZXQgdHlwZSBmaXJzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTW9kdWxlLnNpZ25UeChwYXJhbXMpO1xuICB9XG5cbiAgYXN5bmMgc2lnbkJsb2IocGFyYW1zOiB7IGJsb2I6IHN0cmluZzsgcHVibGljS2V5Pzogc3RyaW5nIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT4ge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFdhbGxldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2Ugc2V0IHRoZSB3YWxsZXQgdHlwZSBmaXJzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTW9kdWxlLnNpZ25CbG9iKHBhcmFtcyk7XG4gIH1cblxuICBhc3luYyBzaWduQXV0aEVudHJ5KHBhcmFtczogeyBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRXYWxsZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHNldCB0aGUgd2FsbGV0IHR5cGUgZmlyc3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE1vZHVsZS5zaWduQXV0aEVudHJ5KHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgLSBUaGlzIG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2VzLlxuICAgKiBVc2Ugc3BlY2lmaWMgbWV0aG9kcyBpbnN0ZWFkIGxpa2Ugc2lnblR4LCBzaWduQmxvYiwgZXRjXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbihcbiAgICBwYXJhbXM6IElTdGVsbGFyV2FsbGV0c1NpZ25CbG9iIHwgSVN0ZWxsYXJXYWxsZXRzU2lnblR4IHwgSVN0ZWxsYXJXYWxsZXRzU2lnbkF1dGhFbnRyeVxuICApOiBQcm9taXNlPHsgc2lnbmVkWERSOiBzdHJpbmcgfT4ge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFdhbGxldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2Ugc2V0IHRoZSB3YWxsZXQgdHlwZSBmaXJzdCcpO1xuICAgIH1cblxuICAgIGxldCBzaWduZWRYRFI6IHN0cmluZztcbiAgICBpZiAoKHBhcmFtcyBhcyBJU3RlbGxhcldhbGxldHNTaWduVHgpLnhkcikge1xuICAgICAgY29uc3QgeyByZXN1bHQgfSA9IGF3YWl0IHRoaXMuc2VsZWN0ZWRNb2R1bGUuc2lnblR4KHtcbiAgICAgICAgeGRyOiAocGFyYW1zIGFzIElTdGVsbGFyV2FsbGV0c1NpZ25UeCkueGRyLFxuICAgICAgICBuZXR3b3JrOiBwYXJhbXMubmV0d29yayB8fCB0aGlzLm5ldHdvcmssXG4gICAgICAgIHB1YmxpY0tleXM6IHBhcmFtcy5wdWJsaWNLZXkgPyBbcGFyYW1zLnB1YmxpY0tleV0gOiBbXSxcbiAgICAgIH0pO1xuICAgICAgc2lnbmVkWERSID0gcmVzdWx0O1xuICAgIH0gZWxzZSBpZiAoKHBhcmFtcyBhcyBJU3RlbGxhcldhbGxldHNTaWduQmxvYikuYmxvYikge1xuICAgICAgY29uc3QgeyByZXN1bHQgfSA9IGF3YWl0IHRoaXMuc2VsZWN0ZWRNb2R1bGUuc2lnbkJsb2Ioe1xuICAgICAgICBibG9iOiAocGFyYW1zIGFzIElTdGVsbGFyV2FsbGV0c1NpZ25CbG9iKS5ibG9iLFxuICAgICAgICBwdWJsaWNLZXk6IHBhcmFtcy5wdWJsaWNLZXksXG4gICAgICB9KTtcbiAgICAgIHNpZ25lZFhEUiA9IHJlc3VsdDtcbiAgICB9IGVsc2UgaWYgKChwYXJhbXMgYXMgSVN0ZWxsYXJXYWxsZXRzU2lnbkF1dGhFbnRyeSkuZW50cnlQcmVpbWFnZVhEUikge1xuICAgICAgY29uc3QgeyByZXN1bHQgfSA9IGF3YWl0IHRoaXMuc2VsZWN0ZWRNb2R1bGUuc2lnbkJsb2Ioe1xuICAgICAgICBibG9iOiAocGFyYW1zIGFzIElTdGVsbGFyV2FsbGV0c1NpZ25BdXRoRW50cnkpLmVudHJ5UHJlaW1hZ2VYRFIsXG4gICAgICAgIHB1YmxpY0tleTogcGFyYW1zLnB1YmxpY0tleSxcbiAgICAgIH0pO1xuICAgICAgc2lnbmVkWERSID0gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvbWV0aGluZyB3ZW50IHdyb25nLCBtYWtlIHN1cmUgdGhlIHBhcmFtZXRlcnMgYXJlIGNvcnJlY3RgKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzaWduZWRYRFIgfTtcbiAgfVxuXG4gIC8vIC0tLS0gTW9kYWwgbWV0aG9kc1xuICBwdWJsaWMgYXN5bmMgb3Blbk1vZGFsKHBhcmFtczoge1xuICAgIG9uV2FsbGV0U2VsZWN0ZWQ6IChvcHRpb246IElTdXBwb3J0ZWRXYWxsZXQpID0+IHZvaWQ7XG4gICAgb25DbG9zZWQ/OiAoZXJyOiBFcnJvcikgPT4gdm9pZDtcbiAgICBtb2RhbERpYWxvZ1N0eWxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwgfTtcbiAgICBtb2RhbFRpdGxlPzogc3RyaW5nO1xuICAgIG5vdEF2YWlsYWJsZVRleHQ/OiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5tb2RhbEVsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3RlbGxhciBXYWxsZXRzIE1vZGFsIGlzIGFscmVhZHkgb3BlbmApO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3RlbGxhci13YWxsZXRzLW1vZGFsJykgYXMgU3RlbGxhcldhbGxldHNNb2RhbDtcbiAgICB0aGlzLm1vZGFsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Nob3dNb2RhbCcsICcnKTtcblxuICAgIGlmIChwYXJhbXMubW9kYWxEaWFsb2dTdHlsZXMpIHtcbiAgICAgIHRoaXMubW9kYWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnbW9kYWxEaWFsb2dTdHlsZXMnLCBKU09OLnN0cmluZ2lmeShwYXJhbXMubW9kYWxEaWFsb2dTdHlsZXMpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdXBwb3J0ZWRXYWxsZXRzOiBJU3VwcG9ydGVkV2FsbGV0W10gPSBhd2FpdCB0aGlzLmdldFN1cHBvcnRlZFdhbGxldHMoKTtcbiAgICB0aGlzLm1vZGFsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FsbG93ZWRXYWxsZXRzJywgSlNPTi5zdHJpbmdpZnkoc3VwcG9ydGVkV2FsbGV0cykpO1xuXG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XG4gICAgICB0aGlzLm1vZGFsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21vZGFsVGl0bGUnLCBwYXJhbXMubW9kYWxUaXRsZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5ub3RBdmFpbGFibGVUZXh0KSB7XG4gICAgICB0aGlzLm1vZGFsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25vdEF2YWlsYWJsZVRleHQnLCBwYXJhbXMubm90QXZhaWxhYmxlVGV4dCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsRWxlbWVudCk7XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIHBhcmFtcy5vbldhbGxldFNlbGVjdGVkKGV2ZW50LmRldGFpbCk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLm1vZGFsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3YWxsZXQtc2VsZWN0ZWQnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsRWxlbWVudCk7XG4gICAgICB0aGlzLm1vZGFsRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLm1vZGFsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3YWxsZXQtc2VsZWN0ZWQnLCBsaXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgY29uc3QgZXJyb3JMaXN0ZW5lciA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGlmIChwYXJhbXMub25DbG9zZWQpIHtcbiAgICAgICAgcGFyYW1zLm9uQ2xvc2VkKGV2ZW50LmRldGFpbCk7XG4gICAgICB9XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLm1vZGFsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3YWxsZXQtc2VsZWN0ZWQnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5tb2RhbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW9kYWwtY2xvc2VkJywgZXJyb3JMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsRWxlbWVudCk7XG4gICAgICB0aGlzLm1vZGFsRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLm1vZGFsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb2RhbC1jbG9zZWQnLCBlcnJvckxpc3RlbmVyLCBmYWxzZSk7XG4gIH1cbiAgLy8gLS0tLSBFTkQgTW9kYWwgbWV0aG9kc1xufVxuIl19