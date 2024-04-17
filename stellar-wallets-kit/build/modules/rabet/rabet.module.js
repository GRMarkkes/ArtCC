import { ModuleType, WalletNetwork } from '../../types';
export const RABET_ID = 'rabet';
export class RabetModule {
    constructor() {
        this.moduleType = ModuleType.HOT_WALLET;
        this.productId = RABET_ID;
        this.productName = 'Rabet';
        this.productUrl = 'https://rabet.io/';
        this.productIcon = 'https://stellar.creit.tech/wallet-icons/rabet.svg';
    }
    async isAvailable() {
        return !!window.rabet;
    }
    async getPublicKey() {
        if (!window.rabet) {
            throw new Error('Rabet is not installed');
        }
        const { publicKey } = await window.rabet.connect();
        return publicKey;
    }
    async signTx(params) {
        if (!window.rabet) {
            throw new Error('Rabet is not installed');
        }
        if (params.network !== WalletNetwork.PUBLIC && params.network !== WalletNetwork.TESTNET) {
            throw new Error(`Rabet doesn't support the network: ${params.network}`);
        }
        if (params.publicKeys.length > 0) {
            console.warn(`Rabet doesn't allow specifying the public keys to use`);
        }
        const result = await window.rabet.sign(params.xdr, params.network === WalletNetwork.PUBLIC ? RabetNetwork.PUBLIC : RabetNetwork.TESTNET);
        return { result: result.xdr };
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signBlob(params) {
        throw new Error('Rabet does not support signing random blobs');
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signAuthEntry(params) {
        throw new Error('Rabet does not support signing authorization entries');
    }
}
export var RabetNetwork;
(function (RabetNetwork) {
    RabetNetwork["PUBLIC"] = "mainnet";
    RabetNetwork["TESTNET"] = "testnet";
})(RabetNetwork || (RabetNetwork = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFiZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcmFiZXQvcmFiZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBbUIsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVV6RSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBRWhDLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ0UsZUFBVSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFFL0MsY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUM3QixnQkFBVyxHQUFXLE9BQU8sQ0FBQztRQUM5QixlQUFVLEdBQVcsbUJBQW1CLENBQUM7UUFDekMsZ0JBQVcsR0FBVyxtREFBbUQsQ0FBQztJQWdENUUsQ0FBQztJQTlDQyxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUMzQztRQUVELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBcUU7UUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3ZGLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEMsTUFBTSxDQUFDLEdBQUcsRUFDVixNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ3JGLENBQUM7UUFFRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQTRDO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQXdEO1FBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQU4sSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLGtDQUFrQixDQUFBO0lBQ2xCLG1DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxZQUFZLEtBQVosWUFBWSxRQUd2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZUludGVyZmFjZSwgTW9kdWxlVHlwZSwgV2FsbGV0TmV0d29yayB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IFdpbmRvdyAmXG4gIHR5cGVvZiBnbG9iYWxUaGlzICYge1xuICAgIHJhYmV0Pzoge1xuICAgICAgY29ubmVjdDogKCkgPT4gUHJvbWlzZTx7IHB1YmxpY0tleTogc3RyaW5nIH0+O1xuICAgICAgc2lnbjogKHhkcjogc3RyaW5nLCBuZXR3b3JrOiBSYWJldE5ldHdvcmspID0+IFByb21pc2U8eyB4ZHI6IHN0cmluZyB9PjtcbiAgICB9O1xuICB9O1xuXG5leHBvcnQgY29uc3QgUkFCRVRfSUQgPSAncmFiZXQnO1xuXG5leHBvcnQgY2xhc3MgUmFiZXRNb2R1bGUgaW1wbGVtZW50cyBNb2R1bGVJbnRlcmZhY2Uge1xuICBtb2R1bGVUeXBlOiBNb2R1bGVUeXBlID0gTW9kdWxlVHlwZS5IT1RfV0FMTEVUO1xuXG4gIHByb2R1Y3RJZDogc3RyaW5nID0gUkFCRVRfSUQ7XG4gIHByb2R1Y3ROYW1lOiBzdHJpbmcgPSAnUmFiZXQnO1xuICBwcm9kdWN0VXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9yYWJldC5pby8nO1xuICBwcm9kdWN0SWNvbjogc3RyaW5nID0gJ2h0dHBzOi8vc3RlbGxhci5jcmVpdC50ZWNoL3dhbGxldC1pY29ucy9yYWJldC5zdmcnO1xuXG4gIGFzeW5jIGlzQXZhaWxhYmxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIXdpbmRvdy5yYWJldDtcbiAgfVxuXG4gIGFzeW5jIGdldFB1YmxpY0tleSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICghd2luZG93LnJhYmV0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhYmV0IGlzIG5vdCBpbnN0YWxsZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHB1YmxpY0tleSB9ID0gYXdhaXQgd2luZG93LnJhYmV0LmNvbm5lY3QoKTtcblxuICAgIHJldHVybiBwdWJsaWNLZXk7XG4gIH1cblxuICBhc3luYyBzaWduVHgocGFyYW1zOiB7IHhkcjogc3RyaW5nOyBwdWJsaWNLZXlzOiBzdHJpbmdbXTsgbmV0d29yazogV2FsbGV0TmV0d29yayB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICBpZiAoIXdpbmRvdy5yYWJldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYWJldCBpcyBub3QgaW5zdGFsbGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5uZXR3b3JrICE9PSBXYWxsZXROZXR3b3JrLlBVQkxJQyAmJiBwYXJhbXMubmV0d29yayAhPT0gV2FsbGV0TmV0d29yay5URVNUTkVUKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJhYmV0IGRvZXNuJ3Qgc3VwcG9ydCB0aGUgbmV0d29yazogJHtwYXJhbXMubmV0d29ya31gKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnB1YmxpY0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS53YXJuKGBSYWJldCBkb2Vzbid0IGFsbG93IHNwZWNpZnlpbmcgdGhlIHB1YmxpYyBrZXlzIHRvIHVzZWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHdpbmRvdy5yYWJldC5zaWduKFxuICAgICAgcGFyYW1zLnhkcixcbiAgICAgIHBhcmFtcy5uZXR3b3JrID09PSBXYWxsZXROZXR3b3JrLlBVQkxJQyA/IFJhYmV0TmV0d29yay5QVUJMSUMgOiBSYWJldE5ldHdvcmsuVEVTVE5FVFxuICAgICk7XG5cbiAgICByZXR1cm4geyByZXN1bHQ6IHJlc3VsdC54ZHIgfTtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBvcGVyYXRpb24gc28gd2UgZG9uJ3QgdXNlIHRoZSBwYXJhbXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBhc3luYyBzaWduQmxvYihwYXJhbXM6IHsgYmxvYjogc3RyaW5nOyBwdWJsaWNLZXk/OiBzdHJpbmcgfSk6IFByb21pc2U8eyByZXN1bHQ6IHN0cmluZyB9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSYWJldCBkb2VzIG5vdCBzdXBwb3J0IHNpZ25pbmcgcmFuZG9tIGJsb2JzJyk7XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgb3BlcmF0aW9uIHNvIHdlIGRvbid0IHVzZSB0aGUgcGFyYW1zXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgYXN5bmMgc2lnbkF1dGhFbnRyeShwYXJhbXM6IHsgZW50cnlQcmVpbWFnZVhEUjogc3RyaW5nOyBwdWJsaWNLZXk/OiBzdHJpbmcgfSk6IFByb21pc2U8eyByZXN1bHQ6IHN0cmluZyB9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSYWJldCBkb2VzIG5vdCBzdXBwb3J0IHNpZ25pbmcgYXV0aG9yaXphdGlvbiBlbnRyaWVzJyk7XG4gIH1cbn1cblxuZXhwb3J0IGVudW0gUmFiZXROZXR3b3JrIHtcbiAgUFVCTElDID0gJ21haW5uZXQnLFxuICBURVNUTkVUID0gJ3Rlc3RuZXQnLFxufVxuIl19