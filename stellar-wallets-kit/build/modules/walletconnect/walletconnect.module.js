import { WalletConnectModal } from '@walletconnect/modal';
import { SignClient } from '@walletconnect/sign-client';
import { ModuleType, WalletNetwork } from '../../types';
const parseWalletConnectSession = (session) => {
    const accounts = session.namespaces.stellar.accounts.map((account) => ({
        network: account.split(':')[1],
        publicKey: account.split(':')[2],
    }));
    return {
        id: session.topic,
        name: session.peer.metadata.name,
        description: session.peer.metadata.description,
        url: session.peer.metadata.url,
        icons: session.peer.metadata.icons[0],
        accounts,
    };
};
export const WALLET_CONNECT_ID = 'wallet_connect';
export class WalletConnectModule {
    constructor(wcParams) {
        this.wcParams = wcParams;
        this.moduleType = ModuleType.BRIDGE_WALLET;
        this.productId = WALLET_CONNECT_ID;
        this.productName = 'Wallet Connect';
        this.productUrl = 'https://walletconnect.com/';
        this.productIcon = 'https://stellar.creit.tech/wallet-icons/walletconnect.svg';
        if (wcParams.sessionId) {
            this.setSession(wcParams.sessionId);
        }
        SignClient.init({
            projectId: wcParams.projectId,
            metadata: {
                name: wcParams.name,
                url: wcParams.url,
                description: wcParams.description,
                icons: wcParams.icons,
            },
        })
            .then(client => {
            console.log('WalletConnect is ready.');
            this.client = client;
            this.qrModal = new WalletConnectModal({ projectId: wcParams.projectId });
        })
            .catch(console.error);
    }
    async isAvailable() {
        return true;
    }
    async getPublicKey() {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        const targetSession = await this.getTargetSession();
        return targetSession.accounts[0].publicKey;
    }
    async signTx(params) {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        let updatedXdr = params.xdr;
        for (const publicKey of params.publicKeys) {
            const targetSession = await this.getTargetSession({ publicKey });
            updatedXdr = await this.client
                .request({
                topic: targetSession.id,
                chainId: params.network === WalletNetwork.PUBLIC
                    ? WalletConnectTargetChain.PUBLIC
                    : WalletConnectTargetChain.TESTNET,
                request: {
                    method: this.wcParams.method,
                    params: { xdr: params.xdr },
                },
            })
                .then((v) => v.signedXDR);
        }
        return { result: updatedXdr };
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signBlob(params) {
        throw new Error('xBull does not support signing random blobs');
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signAuthEntry(params) {
        throw new Error('xBull does not support signing authorization entries');
    }
    /**
     * Allows manually setting the current active session to be used in the kit when doing WalletConnect requests
     *
     * @param sessionId The session ID is a placeholder for the session "topic", term used in WalletConnect
     * */
    setSession(sessionId) {
        this.activeSession = sessionId;
    }
    onSessionDeleted(cb) {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        this.client.on('session_delete', data => {
            cb(data.topic);
        });
    }
    async connectWalletConnect() {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        try {
            const { uri, approval } = await this.client.connect({
                requiredNamespaces: {
                    stellar: {
                        methods: [this.wcParams.method],
                        chains: [
                            this.wcParams.network === WalletNetwork.PUBLIC
                                ? WalletConnectTargetChain.PUBLIC
                                : WalletConnectTargetChain.TESTNET,
                        ],
                        events: [],
                    },
                },
            });
            const session = await new Promise((resolve, reject) => {
                // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
                if (uri) {
                    this.qrModal.openModal({ uri });
                }
                // Await session approval from the wallet.
                approval()
                    .then(session => {
                    this.qrModal.closeModal();
                    resolve(session);
                })
                    .catch(error => {
                    this.qrModal.closeModal();
                    reject(error);
                });
            }).then(parseWalletConnectSession);
            this.setSession(session.id);
            return session;
        }
        catch (e) {
            this.qrModal.closeModal();
            console.error(e);
            throw new Error('There was an error when trying to connect');
        }
    }
    async closeSession(sessionId, reason) {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        await this.client.disconnect({
            topic: sessionId,
            reason: {
                message: reason || 'Session closed',
                code: -1,
            },
        });
    }
    async getSessions() {
        if (!this.client) {
            throw new Error('WalletConnect is not running yet');
        }
        return this.client.session.values.map(parseWalletConnectSession);
    }
    async getTargetSession(params) {
        const activeSessions = await this.getSessions();
        let targetSession = activeSessions.find((session) => session.id === this.activeSession || !!session.accounts.find(a => a.publicKey === (params === null || params === void 0 ? void 0 : params.publicKey)));
        if (!targetSession) {
            targetSession = await this.connectWalletConnect();
        }
        return targetSession;
    }
}
export var WalletConnectTargetChain;
(function (WalletConnectTargetChain) {
    WalletConnectTargetChain["PUBLIC"] = "stellar:pubnet";
    WalletConnectTargetChain["TESTNET"] = "stellar:testnet";
})(WalletConnectTargetChain || (WalletConnectTargetChain = {}));
export var WalletConnectAllowedMethods;
(function (WalletConnectAllowedMethods) {
    WalletConnectAllowedMethods["SIGN"] = "stellar_signXDR";
    WalletConnectAllowedMethods["SIGN_AND_SUBMIT"] = "stellar_signAndSubmitXDR";
})(WalletConnectAllowedMethods || (WalletConnectAllowedMethods = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0Y29ubmVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy93YWxsZXRjb25uZWN0L3dhbGxldGNvbm5lY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd4RCxPQUFPLEVBQW1CLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFekUsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLE9BQTRCLEVBQStCLEVBQUU7SUFDOUYsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQXlCO1FBQ3RELFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVKLE9BQU87UUFDTCxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDakIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7UUFDaEMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVc7UUFDOUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7UUFDOUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckMsUUFBUTtLQUNULENBQUM7QUFDSixDQUFDLENBQUM7QUFlRixNQUFNLENBQUMsTUFB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Q0FDRjtBQWFELE1BQU0sQ0FBTixJQUFZLHdCQUdYO0FBSEQsV0FBWSx3QkFBd0I7SUFDbEMscURBQXlCLENBQUE7SUFDekIsdURBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUhXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFHbkM7QUFFRCxNQUFNLENBQU4sSUFBWSwyQkFHWDtBQUhELFdBQVksMkJBQTJCO0lBQ3JDLHVEQUF3QixDQUFBO0lBQ3hCLDJFQUE0QyxDQUFBO0FBQzlDLENBQUMsRUFIVywyQkFBMkIsS0FBM0IsMkJBQTJCLFFBR3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2FsbGV0Q29ubmVjdE1vZGFsIH0gZnJvbSAnQHdhbGxldGNvbm5lY3QvbW9kYWwnO1xuaW1wb3J0IHsgU2lnbkNsaWVudCB9IGZyb20gJ0B3YWxsZXRjb25uZWN0L3NpZ24tY2xpZW50JztcbmltcG9ydCB7IElTaWduQ2xpZW50IH0gZnJvbSAnQHdhbGxldGNvbm5lY3QvdHlwZXMvZGlzdC90eXBlcy9zaWduLWNsaWVudC9jbGllbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblR5cGVzIH0gZnJvbSAnQHdhbGxldGNvbm5lY3QvdHlwZXMvZGlzdC90eXBlcy9zaWduLWNsaWVudC9zZXNzaW9uJztcbmltcG9ydCB7IE1vZHVsZUludGVyZmFjZSwgTW9kdWxlVHlwZSwgV2FsbGV0TmV0d29yayB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuY29uc3QgcGFyc2VXYWxsZXRDb25uZWN0U2Vzc2lvbiA9IChzZXNzaW9uOiBTZXNzaW9uVHlwZXMuU3RydWN0KTogSVBhcnNlZFdhbGxldENvbm5lY3RTZXNzaW9uID0+IHtcbiAgY29uc3QgYWNjb3VudHMgPSBzZXNzaW9uLm5hbWVzcGFjZXMuc3RlbGxhci5hY2NvdW50cy5tYXAoKGFjY291bnQ6IHN0cmluZykgPT4gKHtcbiAgICBuZXR3b3JrOiBhY2NvdW50LnNwbGl0KCc6JylbMV0gYXMgJ3B1Ym5ldCcgfCAndGVzdG5ldCcsXG4gICAgcHVibGljS2V5OiBhY2NvdW50LnNwbGl0KCc6JylbMl0sXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIGlkOiBzZXNzaW9uLnRvcGljLFxuICAgIG5hbWU6IHNlc3Npb24ucGVlci5tZXRhZGF0YS5uYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBzZXNzaW9uLnBlZXIubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgdXJsOiBzZXNzaW9uLnBlZXIubWV0YWRhdGEudXJsLFxuICAgIGljb25zOiBzZXNzaW9uLnBlZXIubWV0YWRhdGEuaWNvbnNbMF0sXG4gICAgYWNjb3VudHMsXG4gIH07XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbiB7XG4gIC8vIFwiaWRcIiBpcyB0aGUgdG9waWMsIHdlIGNhbGwgaXQgXCJpZFwiIHRvIG1ha2UgaXQgZWFzaWVyIGZvciB0aG9zZSBub3QgZmFtaWxpYXJpemVkIHdpdGggV2FsbGV0Q29ubmVjdFxuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBpY29uczogc3RyaW5nO1xuICBhY2NvdW50czogQXJyYXk8e1xuICAgIG5ldHdvcms6ICdwdWJuZXQnIHwgJ3Rlc3RuZXQnO1xuICAgIHB1YmxpY0tleTogc3RyaW5nO1xuICB9Pjtcbn1cblxuZXhwb3J0IGNvbnN0IFdBTExFVF9DT05ORUNUX0lEID0gJ3dhbGxldF9jb25uZWN0JztcblxuZXhwb3J0IGNsYXNzIFdhbGxldENvbm5lY3RNb2R1bGUgaW1wbGVtZW50cyBNb2R1bGVJbnRlcmZhY2Uge1xuICBtb2R1bGVUeXBlOiBNb2R1bGVUeXBlID0gTW9kdWxlVHlwZS5CUklER0VfV0FMTEVUO1xuXG4gIHByb2R1Y3RJZDogc3RyaW5nID0gV0FMTEVUX0NPTk5FQ1RfSUQ7XG4gIHByb2R1Y3ROYW1lOiBzdHJpbmcgPSAnV2FsbGV0IENvbm5lY3QnO1xuICBwcm9kdWN0VXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly93YWxsZXRjb25uZWN0LmNvbS8nO1xuICBwcm9kdWN0SWNvbjogc3RyaW5nID0gJ2h0dHBzOi8vc3RlbGxhci5jcmVpdC50ZWNoL3dhbGxldC1pY29ucy93YWxsZXRjb25uZWN0LnN2Zyc7XG5cbiAgcHJpdmF0ZSBjbGllbnQ/OiBJU2lnbkNsaWVudCAmIHtcbiAgICBvbjogKGV2ZW50OiBzdHJpbmcsIGNiOiAoZGF0YTogeyB0b3BpYzogc3RyaW5nIH0pID0+IHZvaWQpID0+IHZvaWQ7XG4gIH07XG4gIHByaXZhdGUgYWN0aXZlU2Vzc2lvbj86IHN0cmluZztcbiAgcHJpdmF0ZSBxck1vZGFsITogV2FsbGV0Q29ubmVjdE1vZGFsO1xuXG4gIGFzeW5jIGlzQXZhaWxhYmxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHdjUGFyYW1zOiBJV2FsbGV0Q29ubmVjdENvbnN0cnVjdG9yUGFyYW1zKSB7XG4gICAgaWYgKHdjUGFyYW1zLnNlc3Npb25JZCkge1xuICAgICAgdGhpcy5zZXRTZXNzaW9uKHdjUGFyYW1zLnNlc3Npb25JZCk7XG4gICAgfVxuXG4gICAgU2lnbkNsaWVudC5pbml0KHtcbiAgICAgIHByb2plY3RJZDogd2NQYXJhbXMucHJvamVjdElkLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgbmFtZTogd2NQYXJhbXMubmFtZSxcbiAgICAgICAgdXJsOiB3Y1BhcmFtcy51cmwsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB3Y1BhcmFtcy5kZXNjcmlwdGlvbixcbiAgICAgICAgaWNvbnM6IHdjUGFyYW1zLmljb25zLFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oY2xpZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dhbGxldENvbm5lY3QgaXMgcmVhZHkuJyk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50IGFzIG5ldmVyO1xuICAgICAgICB0aGlzLnFyTW9kYWwgPSBuZXcgV2FsbGV0Q29ubmVjdE1vZGFsKHsgcHJvamVjdElkOiB3Y1BhcmFtcy5wcm9qZWN0SWQgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICB9XG5cbiAgYXN5bmMgZ2V0UHVibGljS2V5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCF0aGlzLmNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXYWxsZXRDb25uZWN0IGlzIG5vdCBydW5uaW5nIHlldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldFNlc3Npb246IElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbiA9IGF3YWl0IHRoaXMuZ2V0VGFyZ2V0U2Vzc2lvbigpO1xuICAgIHJldHVybiB0YXJnZXRTZXNzaW9uLmFjY291bnRzWzBdLnB1YmxpY0tleTtcbiAgfVxuXG4gIGFzeW5jIHNpZ25UeChwYXJhbXM6IHsgeGRyOiBzdHJpbmc7IHB1YmxpY0tleXM6IHN0cmluZ1tdOyBuZXR3b3JrOiBXYWxsZXROZXR3b3JrIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT4ge1xuICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2FsbGV0Q29ubmVjdCBpcyBub3QgcnVubmluZyB5ZXQnKTtcbiAgICB9XG5cbiAgICBsZXQgdXBkYXRlZFhkcjogc3RyaW5nID0gcGFyYW1zLnhkcjtcbiAgICBmb3IgKGNvbnN0IHB1YmxpY0tleSBvZiBwYXJhbXMucHVibGljS2V5cykge1xuICAgICAgY29uc3QgdGFyZ2V0U2Vzc2lvbjogSVBhcnNlZFdhbGxldENvbm5lY3RTZXNzaW9uID0gYXdhaXQgdGhpcy5nZXRUYXJnZXRTZXNzaW9uKHsgcHVibGljS2V5IH0pO1xuICAgICAgdXBkYXRlZFhkciA9IGF3YWl0IHRoaXMuY2xpZW50XG4gICAgICAgIC5yZXF1ZXN0KHtcbiAgICAgICAgICB0b3BpYzogdGFyZ2V0U2Vzc2lvbi5pZCxcbiAgICAgICAgICBjaGFpbklkOlxuICAgICAgICAgICAgcGFyYW1zLm5ldHdvcmsgPT09IFdhbGxldE5ldHdvcmsuUFVCTElDXG4gICAgICAgICAgICAgID8gV2FsbGV0Q29ubmVjdFRhcmdldENoYWluLlBVQkxJQ1xuICAgICAgICAgICAgICA6IFdhbGxldENvbm5lY3RUYXJnZXRDaGFpbi5URVNUTkVULFxuICAgICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy53Y1BhcmFtcy5tZXRob2QsXG4gICAgICAgICAgICBwYXJhbXM6IHsgeGRyOiBwYXJhbXMueGRyIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHY6IGFueSkgPT4gdi5zaWduZWRYRFIpO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJlc3VsdDogdXBkYXRlZFhkciB9O1xuICB9XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRoaXMgaXMgbm90IGEgc3VwcG9ydGVkIG9wZXJhdGlvbiBzbyB3ZSBkb24ndCB1c2UgdGhlIHBhcmFtc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIGFzeW5jIHNpZ25CbG9iKHBhcmFtczogeyBibG9iOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3hCdWxsIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyByYW5kb20gYmxvYnMnKTtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBvcGVyYXRpb24gc28gd2UgZG9uJ3QgdXNlIHRoZSBwYXJhbXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBhc3luYyBzaWduQXV0aEVudHJ5KHBhcmFtczogeyBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3hCdWxsIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyBhdXRob3JpemF0aW9uIGVudHJpZXMnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbWFudWFsbHkgc2V0dGluZyB0aGUgY3VycmVudCBhY3RpdmUgc2Vzc2lvbiB0byBiZSB1c2VkIGluIHRoZSBraXQgd2hlbiBkb2luZyBXYWxsZXRDb25uZWN0IHJlcXVlc3RzXG4gICAqXG4gICAqIEBwYXJhbSBzZXNzaW9uSWQgVGhlIHNlc3Npb24gSUQgaXMgYSBwbGFjZWhvbGRlciBmb3IgdGhlIHNlc3Npb24gXCJ0b3BpY1wiLCB0ZXJtIHVzZWQgaW4gV2FsbGV0Q29ubmVjdFxuICAgKiAqL1xuICBwdWJsaWMgc2V0U2Vzc2lvbihzZXNzaW9uSWQ6IHN0cmluZykge1xuICAgIHRoaXMuYWN0aXZlU2Vzc2lvbiA9IHNlc3Npb25JZDtcbiAgfVxuXG4gIHB1YmxpYyBvblNlc3Npb25EZWxldGVkKGNiOiAoc2Vzc2lvbklkOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICBpZiAoIXRoaXMuY2xpZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dhbGxldENvbm5lY3QgaXMgbm90IHJ1bm5pbmcgeWV0Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGllbnQub24oJ3Nlc3Npb25fZGVsZXRlJywgZGF0YSA9PiB7XG4gICAgICBjYihkYXRhLnRvcGljKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb25uZWN0V2FsbGV0Q29ubmVjdCgpOiBQcm9taXNlPElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbj4ge1xuICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2FsbGV0Q29ubmVjdCBpcyBub3QgcnVubmluZyB5ZXQnKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyB1cmksIGFwcHJvdmFsIH0gPSBhd2FpdCB0aGlzLmNsaWVudC5jb25uZWN0KHtcbiAgICAgICAgcmVxdWlyZWROYW1lc3BhY2VzOiB7XG4gICAgICAgICAgc3RlbGxhcjoge1xuICAgICAgICAgICAgbWV0aG9kczogW3RoaXMud2NQYXJhbXMubWV0aG9kXSxcbiAgICAgICAgICAgIGNoYWluczogW1xuICAgICAgICAgICAgICB0aGlzLndjUGFyYW1zLm5ldHdvcmsgPT09IFdhbGxldE5ldHdvcmsuUFVCTElDXG4gICAgICAgICAgICAgICAgPyBXYWxsZXRDb25uZWN0VGFyZ2V0Q2hhaW4uUFVCTElDXG4gICAgICAgICAgICAgICAgOiBXYWxsZXRDb25uZWN0VGFyZ2V0Q2hhaW4uVEVTVE5FVCxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNlc3Npb246IElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbiA9IGF3YWl0IG5ldyBQcm9taXNlPFNlc3Npb25UeXBlcy5TdHJ1Y3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gT3BlbiBRUkNvZGUgbW9kYWwgaWYgYSBVUkkgd2FzIHJldHVybmVkIChpLmUuIHdlJ3JlIG5vdCBjb25uZWN0aW5nIGFuIGV4aXN0aW5nIHBhaXJpbmcpLlxuICAgICAgICBpZiAodXJpKSB7XG4gICAgICAgICAgdGhpcy5xck1vZGFsLm9wZW5Nb2RhbCh7IHVyaSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF3YWl0IHNlc3Npb24gYXBwcm92YWwgZnJvbSB0aGUgd2FsbGV0LlxuICAgICAgICBhcHByb3ZhbCgpXG4gICAgICAgICAgLnRoZW4oc2Vzc2lvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLnFyTW9kYWwuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgcmVzb2x2ZShzZXNzaW9uKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnFyTW9kYWwuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pLnRoZW4ocGFyc2VXYWxsZXRDb25uZWN0U2Vzc2lvbik7XG5cbiAgICAgIHRoaXMuc2V0U2Vzc2lvbihzZXNzaW9uLmlkKTtcbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcbiAgICAgIHRoaXMucXJNb2RhbC5jbG9zZU1vZGFsKCk7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiB0cnlpbmcgdG8gY29ubmVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbG9zZVNlc3Npb24oc2Vzc2lvbklkOiBzdHJpbmcsIHJlYXNvbj86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2FsbGV0Q29ubmVjdCBpcyBub3QgcnVubmluZyB5ZXQnKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmNsaWVudC5kaXNjb25uZWN0KHtcbiAgICAgIHRvcGljOiBzZXNzaW9uSWQsXG4gICAgICByZWFzb246IHtcbiAgICAgICAgbWVzc2FnZTogcmVhc29uIHx8ICdTZXNzaW9uIGNsb3NlZCcsXG4gICAgICAgIGNvZGU6IC0xLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRTZXNzaW9ucygpOiBQcm9taXNlPElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbltdPiB7XG4gICAgaWYgKCF0aGlzLmNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXYWxsZXRDb25uZWN0IGlzIG5vdCBydW5uaW5nIHlldCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNsaWVudC5zZXNzaW9uLnZhbHVlcy5tYXAocGFyc2VXYWxsZXRDb25uZWN0U2Vzc2lvbik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFRhcmdldFNlc3Npb24ocGFyYW1zPzogeyBwdWJsaWNLZXk/OiBzdHJpbmcgfSk6IFByb21pc2U8SVBhcnNlZFdhbGxldENvbm5lY3RTZXNzaW9uPiB7XG4gICAgY29uc3QgYWN0aXZlU2Vzc2lvbnM6IElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbltdID0gYXdhaXQgdGhpcy5nZXRTZXNzaW9ucygpO1xuICAgIGxldCB0YXJnZXRTZXNzaW9uOiBJUGFyc2VkV2FsbGV0Q29ubmVjdFNlc3Npb24gfCB1bmRlZmluZWQgPSBhY3RpdmVTZXNzaW9ucy5maW5kKFxuICAgICAgKHNlc3Npb246IElQYXJzZWRXYWxsZXRDb25uZWN0U2Vzc2lvbik6IGJvb2xlYW4gPT5cbiAgICAgICAgc2Vzc2lvbi5pZCA9PT0gdGhpcy5hY3RpdmVTZXNzaW9uIHx8ICEhc2Vzc2lvbi5hY2NvdW50cy5maW5kKGEgPT4gYS5wdWJsaWNLZXkgPT09IHBhcmFtcz8ucHVibGljS2V5KVxuICAgICk7XG5cbiAgICBpZiAoIXRhcmdldFNlc3Npb24pIHtcbiAgICAgIHRhcmdldFNlc3Npb24gPSBhd2FpdCB0aGlzLmNvbm5lY3RXYWxsZXRDb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFNlc3Npb247XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV2FsbGV0Q29ubmVjdENvbnN0cnVjdG9yUGFyYW1zIHtcbiAgcHJvamVjdElkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGljb25zOiBzdHJpbmdbXTtcbiAgbWV0aG9kOiBXYWxsZXRDb25uZWN0QWxsb3dlZE1ldGhvZHM7XG4gIG5ldHdvcms6IFdhbGxldE5ldHdvcms7XG4gIHNlc3Npb25JZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gV2FsbGV0Q29ubmVjdFRhcmdldENoYWluIHtcbiAgUFVCTElDID0gJ3N0ZWxsYXI6cHVibmV0JyxcbiAgVEVTVE5FVCA9ICdzdGVsbGFyOnRlc3RuZXQnLFxufVxuXG5leHBvcnQgZW51bSBXYWxsZXRDb25uZWN0QWxsb3dlZE1ldGhvZHMge1xuICBTSUdOID0gJ3N0ZWxsYXJfc2lnblhEUicsXG4gIFNJR05fQU5EX1NVQk1JVCA9ICdzdGVsbGFyX3NpZ25BbmRTdWJtaXRYRFInLFxufVxuIl19