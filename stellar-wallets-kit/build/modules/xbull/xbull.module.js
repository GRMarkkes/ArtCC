import { xBullWalletConnect } from '@creit-tech/xbull-wallet-connect';
import { ModuleType } from '../../types';
export const XBULL_ID = 'xbull';
export class xBullModule {
    constructor() {
        this.moduleType = ModuleType.HOT_WALLET;
        this.productId = XBULL_ID;
        this.productName = 'xBull';
        this.productUrl = 'https://xbull.app';
        this.productIcon = 'https://stellar.creit.tech/wallet-icons/xbull.svg';
    }
    async isAvailable() {
        return true;
    }
    async getPublicKey() {
        const bridge = new xBullWalletConnect();
        const publicKey = await bridge.connect();
        bridge.closeConnections();
        return publicKey;
    }
    async signTx(params) {
        const bridge = new xBullWalletConnect();
        let updatedXdr = params.xdr;
        for (const publicKey of params.publicKeys) {
            updatedXdr = await bridge.sign({
                xdr: updatedXdr,
                publicKey: publicKey,
                network: params.network,
            });
        }
        bridge.closeConnections();
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGJ1bGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMveGJ1bGwveGJ1bGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBbUIsVUFBVSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBRWhDLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ0UsZUFBVSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFFL0MsY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUM3QixnQkFBVyxHQUFXLE9BQU8sQ0FBQztRQUM5QixlQUFVLEdBQVcsbUJBQW1CLENBQUM7UUFDekMsZ0JBQVcsR0FBVyxtREFBbUQsQ0FBQztJQXdDNUUsQ0FBQztJQXRDQyxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE1BQU0sTUFBTSxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDNUQsTUFBTSxTQUFTLEdBQVcsTUFBTSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBcUU7UUFDaEYsTUFBTSxNQUFNLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUU1RCxJQUFJLFVBQVUsR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM3QixHQUFHLEVBQUUsVUFBVTtnQkFDZixTQUFTLEVBQUUsU0FBUztnQkFDcEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO2FBQ3hCLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQTRDO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQXdEO1FBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB4QnVsbFdhbGxldENvbm5lY3QgfSBmcm9tICdAY3JlaXQtdGVjaC94YnVsbC13YWxsZXQtY29ubmVjdCc7XG5pbXBvcnQgeyBNb2R1bGVJbnRlcmZhY2UsIE1vZHVsZVR5cGUsIFdhbGxldE5ldHdvcmsgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBYQlVMTF9JRCA9ICd4YnVsbCc7XG5cbmV4cG9ydCBjbGFzcyB4QnVsbE1vZHVsZSBpbXBsZW1lbnRzIE1vZHVsZUludGVyZmFjZSB7XG4gIG1vZHVsZVR5cGU6IE1vZHVsZVR5cGUgPSBNb2R1bGVUeXBlLkhPVF9XQUxMRVQ7XG5cbiAgcHJvZHVjdElkOiBzdHJpbmcgPSBYQlVMTF9JRDtcbiAgcHJvZHVjdE5hbWU6IHN0cmluZyA9ICd4QnVsbCc7XG4gIHByb2R1Y3RVcmw6IHN0cmluZyA9ICdodHRwczovL3hidWxsLmFwcCc7XG4gIHByb2R1Y3RJY29uOiBzdHJpbmcgPSAnaHR0cHM6Ly9zdGVsbGFyLmNyZWl0LnRlY2gvd2FsbGV0LWljb25zL3hidWxsLnN2Zyc7XG5cbiAgYXN5bmMgaXNBdmFpbGFibGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBnZXRQdWJsaWNLZXkoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBicmlkZ2U6IHhCdWxsV2FsbGV0Q29ubmVjdCA9IG5ldyB4QnVsbFdhbGxldENvbm5lY3QoKTtcbiAgICBjb25zdCBwdWJsaWNLZXk6IHN0cmluZyA9IGF3YWl0IGJyaWRnZS5jb25uZWN0KCk7XG4gICAgYnJpZGdlLmNsb3NlQ29ubmVjdGlvbnMoKTtcbiAgICByZXR1cm4gcHVibGljS2V5O1xuICB9XG5cbiAgYXN5bmMgc2lnblR4KHBhcmFtczogeyB4ZHI6IHN0cmluZzsgcHVibGljS2V5czogc3RyaW5nW107IG5ldHdvcms6IFdhbGxldE5ldHdvcmsgfSk6IFByb21pc2U8eyByZXN1bHQ6IHN0cmluZyB9PiB7XG4gICAgY29uc3QgYnJpZGdlOiB4QnVsbFdhbGxldENvbm5lY3QgPSBuZXcgeEJ1bGxXYWxsZXRDb25uZWN0KCk7XG5cbiAgICBsZXQgdXBkYXRlZFhkcjogc3RyaW5nID0gcGFyYW1zLnhkcjtcbiAgICBmb3IgKGNvbnN0IHB1YmxpY0tleSBvZiBwYXJhbXMucHVibGljS2V5cykge1xuICAgICAgdXBkYXRlZFhkciA9IGF3YWl0IGJyaWRnZS5zaWduKHtcbiAgICAgICAgeGRyOiB1cGRhdGVkWGRyLFxuICAgICAgICBwdWJsaWNLZXk6IHB1YmxpY0tleSxcbiAgICAgICAgbmV0d29yazogcGFyYW1zLm5ldHdvcmssXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBicmlkZ2UuY2xvc2VDb25uZWN0aW9ucygpO1xuICAgIHJldHVybiB7IHJlc3VsdDogdXBkYXRlZFhkciB9O1xuICB9XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIFRoaXMgaXMgbm90IGEgc3VwcG9ydGVkIG9wZXJhdGlvbiBzbyB3ZSBkb24ndCB1c2UgdGhlIHBhcmFtc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIGFzeW5jIHNpZ25CbG9iKHBhcmFtczogeyBibG9iOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3hCdWxsIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyByYW5kb20gYmxvYnMnKTtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBvcGVyYXRpb24gc28gd2UgZG9uJ3QgdXNlIHRoZSBwYXJhbXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBhc3luYyBzaWduQXV0aEVudHJ5KHBhcmFtczogeyBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3hCdWxsIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyBhdXRob3JpemF0aW9uIGVudHJpZXMnKTtcbiAgfVxufVxuIl19