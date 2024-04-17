import albedo from '@albedo-link/intent';
import { ModuleType, WalletNetwork } from '../../types';
export const ALBEDO_ID = 'albedo';
export class AlbedoModule {
    constructor() {
        this.moduleType = ModuleType.HOT_WALLET;
        this.productId = ALBEDO_ID;
        this.productName = 'Albedo';
        this.productUrl = 'https://albedo.link/';
        this.productIcon = 'https://stellar.creit.tech/wallet-icons/albedo.svg';
    }
    async isAvailable() {
        return true;
    }
    async getPublicKey() {
        return albedo.publicKey({}).then(({ pubkey }) => pubkey);
    }
    async signTx(params) {
        if (params.network !== WalletNetwork.PUBLIC && params.network !== WalletNetwork.TESTNET) {
            throw new Error(`Albedo doesn't support the network: ${params.network}`);
        }
        let updatedXdr = params.xdr;
        for (const publicKey of params.publicKeys) {
            updatedXdr = await albedo
                .tx({
                xdr: updatedXdr,
                pubkey: publicKey,
                network: params.network === WalletNetwork.PUBLIC ? AlbedoNetwork.PUBLIC : AlbedoNetwork.TESTNET,
            })
                .then(({ signed_envelope_xdr }) => signed_envelope_xdr);
        }
        return { result: updatedXdr };
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signBlob(params) {
        throw new Error('Albedo does not support signing random blobs');
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signAuthEntry(params) {
        throw new Error('Albedo does not support signing authorization entries');
    }
}
export var AlbedoNetwork;
(function (AlbedoNetwork) {
    AlbedoNetwork["PUBLIC"] = "public";
    AlbedoNetwork["TESTNET"] = "testnet";
})(AlbedoNetwork || (AlbedoNetwork = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxiZWRvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2FsYmVkby9hbGJlZG8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sRUFBbUIsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBRWxDLE1BQU0sT0FBTyxZQUFZO0lBQXpCO1FBQ0UsZUFBVSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFFL0MsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixlQUFVLEdBQVcsc0JBQXNCLENBQUM7UUFDNUMsZ0JBQVcsR0FBVyxvREFBb0QsQ0FBQztJQXdDN0UsQ0FBQztJQXRDQyxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFxRTtRQUNoRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssYUFBYSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDdkYsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLFVBQVUsR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxVQUFVLEdBQUcsTUFBTSxNQUFNO2lCQUN0QixFQUFFLENBQUM7Z0JBQ0YsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPO2FBQ2hHLENBQUM7aUJBQ0QsSUFBSSxDQUFDLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQTRDO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQXdEO1FBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQU4sSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLGtDQUFpQixDQUFBO0lBQ2pCLG9DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbGJlZG8gZnJvbSAnQGFsYmVkby1saW5rL2ludGVudCc7XG5cbmltcG9ydCB7IE1vZHVsZUludGVyZmFjZSwgTW9kdWxlVHlwZSwgV2FsbGV0TmV0d29yayB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEFMQkVET19JRCA9ICdhbGJlZG8nO1xuXG5leHBvcnQgY2xhc3MgQWxiZWRvTW9kdWxlIGltcGxlbWVudHMgTW9kdWxlSW50ZXJmYWNlIHtcbiAgbW9kdWxlVHlwZTogTW9kdWxlVHlwZSA9IE1vZHVsZVR5cGUuSE9UX1dBTExFVDtcblxuICBwcm9kdWN0SWQ6IHN0cmluZyA9IEFMQkVET19JRDtcbiAgcHJvZHVjdE5hbWU6IHN0cmluZyA9ICdBbGJlZG8nO1xuICBwcm9kdWN0VXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9hbGJlZG8ubGluay8nO1xuICBwcm9kdWN0SWNvbjogc3RyaW5nID0gJ2h0dHBzOi8vc3RlbGxhci5jcmVpdC50ZWNoL3dhbGxldC1pY29ucy9hbGJlZG8uc3ZnJztcblxuICBhc3luYyBpc0F2YWlsYWJsZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGdldFB1YmxpY0tleSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBhbGJlZG8ucHVibGljS2V5KHt9KS50aGVuKCh7IHB1YmtleSB9KSA9PiBwdWJrZXkpO1xuICB9XG5cbiAgYXN5bmMgc2lnblR4KHBhcmFtczogeyB4ZHI6IHN0cmluZzsgcHVibGljS2V5czogc3RyaW5nW107IG5ldHdvcms6IFdhbGxldE5ldHdvcmsgfSk6IFByb21pc2U8eyByZXN1bHQ6IHN0cmluZyB9PiB7XG4gICAgaWYgKHBhcmFtcy5uZXR3b3JrICE9PSBXYWxsZXROZXR3b3JrLlBVQkxJQyAmJiBwYXJhbXMubmV0d29yayAhPT0gV2FsbGV0TmV0d29yay5URVNUTkVUKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFsYmVkbyBkb2Vzbid0IHN1cHBvcnQgdGhlIG5ldHdvcms6ICR7cGFyYW1zLm5ldHdvcmt9YCk7XG4gICAgfVxuXG4gICAgbGV0IHVwZGF0ZWRYZHI6IHN0cmluZyA9IHBhcmFtcy54ZHI7XG4gICAgZm9yIChjb25zdCBwdWJsaWNLZXkgb2YgcGFyYW1zLnB1YmxpY0tleXMpIHtcbiAgICAgIHVwZGF0ZWRYZHIgPSBhd2FpdCBhbGJlZG9cbiAgICAgICAgLnR4KHtcbiAgICAgICAgICB4ZHI6IHVwZGF0ZWRYZHIsXG4gICAgICAgICAgcHVia2V5OiBwdWJsaWNLZXksXG4gICAgICAgICAgbmV0d29yazogcGFyYW1zLm5ldHdvcmsgPT09IFdhbGxldE5ldHdvcmsuUFVCTElDID8gQWxiZWRvTmV0d29yay5QVUJMSUMgOiBBbGJlZG9OZXR3b3JrLlRFU1RORVQsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IHNpZ25lZF9lbnZlbG9wZV94ZHIgfSkgPT4gc2lnbmVkX2VudmVsb3BlX3hkcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgcmVzdWx0OiB1cGRhdGVkWGRyIH07XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgb3BlcmF0aW9uIHNvIHdlIGRvbid0IHVzZSB0aGUgcGFyYW1zXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgYXN5bmMgc2lnbkJsb2IocGFyYW1zOiB7IGJsb2I6IHN0cmluZzsgcHVibGljS2V5Pzogc3RyaW5nIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignQWxiZWRvIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyByYW5kb20gYmxvYnMnKTtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBvcGVyYXRpb24gc28gd2UgZG9uJ3QgdXNlIHRoZSBwYXJhbXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBhc3luYyBzaWduQXV0aEVudHJ5KHBhcmFtczogeyBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsYmVkbyBkb2VzIG5vdCBzdXBwb3J0IHNpZ25pbmcgYXV0aG9yaXphdGlvbiBlbnRyaWVzJyk7XG4gIH1cbn1cblxuZXhwb3J0IGVudW0gQWxiZWRvTmV0d29yayB7XG4gIFBVQkxJQyA9ICdwdWJsaWMnLFxuICBURVNUTkVUID0gJ3Rlc3RuZXQnLFxufVxuIl19