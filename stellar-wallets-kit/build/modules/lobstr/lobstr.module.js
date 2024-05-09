import { isConnected, getPublicKey, signTransaction } from '@lobstrco/signer-extension-api';
import { ModuleType } from '../../types';
export const LOBSTR_ID = 'lobstr';
export class LobstrModule {
    constructor() {
        this.moduleType = ModuleType.HOT_WALLET;
        this.productId = LOBSTR_ID;
        this.productName = 'Lobstr';
        this.productUrl = 'https://lobstr.co';
        this.productIcon = 'https://stellar.creit.tech/wallet-icons/lobstr.svg';
    }
    async isAvailable() {
        return isConnected();
    }
    async getPublicKey() {
        if (!(await isConnected())) {
            throw new Error(`Lobstr is not connected`);
        }
        return getPublicKey();
    }
    async signTx(params) {
        if (!(await isConnected())) {
            throw new Error(`Lobstr is not connected`);
        }
        if (params.publicKeys.length > 0) {
            console.warn(`Lobstr doesn't allow specifying what public key should sign the transaction, we skip the value`);
        }
        if (params.network) {
            console.warn(`Lobstr doesn't allow specifying the network that should be used, we skip the value`);
        }
        return { result: await signTransaction(params.xdr) };
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signBlob(params) {
        throw new Error('Lobstr does not support signing random blobs');
    }
    // @ts-expect-error - This is not a supported operation so we don't use the params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signAuthEntry(params) {
        throw new Error('Lobstr does not support signing authorization entries');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ic3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2xvYnN0ci9sb2JzdHIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVGLE9BQU8sRUFBbUIsVUFBVSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBRWxDLE1BQU0sT0FBTyxZQUFZO0lBQXpCO1FBQ0UsZUFBVSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFFL0MsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixlQUFVLEdBQVcsbUJBQW1CLENBQUM7UUFDekMsZ0JBQVcsR0FBVyxvREFBb0QsQ0FBQztJQXlDN0UsQ0FBQztJQXZDQyxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxDQUFDLE1BQU0sV0FBVyxFQUFFLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7UUFFRCxPQUFPLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQXFFO1FBQ2hGLElBQUksQ0FBQyxDQUFDLE1BQU0sV0FBVyxFQUFFLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdHQUFnRyxDQUFDLENBQUM7U0FDaEg7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDO1NBQ3BHO1FBRUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQTRDO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLDZEQUE2RDtJQUM3RCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQXdEO1FBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Nvbm5lY3RlZCwgZ2V0UHVibGljS2V5LCBzaWduVHJhbnNhY3Rpb24gfSBmcm9tICdAbG9ic3RyY28vc2lnbmVyLWV4dGVuc2lvbi1hcGknO1xuaW1wb3J0IHsgTW9kdWxlSW50ZXJmYWNlLCBNb2R1bGVUeXBlLCBXYWxsZXROZXR3b3JrIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTE9CU1RSX0lEID0gJ2xvYnN0cic7XG5cbmV4cG9ydCBjbGFzcyBMb2JzdHJNb2R1bGUgaW1wbGVtZW50cyBNb2R1bGVJbnRlcmZhY2Uge1xuICBtb2R1bGVUeXBlOiBNb2R1bGVUeXBlID0gTW9kdWxlVHlwZS5IT1RfV0FMTEVUO1xuXG4gIHByb2R1Y3RJZDogc3RyaW5nID0gTE9CU1RSX0lEO1xuICBwcm9kdWN0TmFtZTogc3RyaW5nID0gJ0xvYnN0cic7XG4gIHByb2R1Y3RVcmw6IHN0cmluZyA9ICdodHRwczovL2xvYnN0ci5jbyc7XG4gIHByb2R1Y3RJY29uOiBzdHJpbmcgPSAnaHR0cHM6Ly9zdGVsbGFyLmNyZWl0LnRlY2gvd2FsbGV0LWljb25zL2xvYnN0ci5zdmcnO1xuXG4gIGFzeW5jIGlzQXZhaWxhYmxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBpc0Nvbm5lY3RlZCgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0UHVibGljS2V5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCEoYXdhaXQgaXNDb25uZWN0ZWQoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTG9ic3RyIGlzIG5vdCBjb25uZWN0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0UHVibGljS2V5KCk7XG4gIH1cblxuICBhc3luYyBzaWduVHgocGFyYW1zOiB7IHhkcjogc3RyaW5nOyBwdWJsaWNLZXlzOiBzdHJpbmdbXTsgbmV0d29yazogV2FsbGV0TmV0d29yayB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICBpZiAoIShhd2FpdCBpc0Nvbm5lY3RlZCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2JzdHIgaXMgbm90IGNvbm5lY3RlZGApO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMucHVibGljS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oYExvYnN0ciBkb2Vzbid0IGFsbG93IHNwZWNpZnlpbmcgd2hhdCBwdWJsaWMga2V5IHNob3VsZCBzaWduIHRoZSB0cmFuc2FjdGlvbiwgd2Ugc2tpcCB0aGUgdmFsdWVgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLm5ldHdvcmspIHtcbiAgICAgIGNvbnNvbGUud2FybihgTG9ic3RyIGRvZXNuJ3QgYWxsb3cgc3BlY2lmeWluZyB0aGUgbmV0d29yayB0aGF0IHNob3VsZCBiZSB1c2VkLCB3ZSBza2lwIHRoZSB2YWx1ZWApO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJlc3VsdDogYXdhaXQgc2lnblRyYW5zYWN0aW9uKHBhcmFtcy54ZHIpIH07XG4gIH1cblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gVGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgb3BlcmF0aW9uIHNvIHdlIGRvbid0IHVzZSB0aGUgcGFyYW1zXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgYXN5bmMgc2lnbkJsb2IocGFyYW1zOiB7IGJsb2I6IHN0cmluZzsgcHVibGljS2V5Pzogc3RyaW5nIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9ic3RyIGRvZXMgbm90IHN1cHBvcnQgc2lnbmluZyByYW5kb20gYmxvYnMnKTtcbiAgfVxuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBvcGVyYXRpb24gc28gd2UgZG9uJ3QgdXNlIHRoZSBwYXJhbXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBhc3luYyBzaWduQXV0aEVudHJ5KHBhcmFtczogeyBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7IHB1YmxpY0tleT86IHN0cmluZyB9KTogUHJvbWlzZTx7IHJlc3VsdDogc3RyaW5nIH0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvYnN0ciBkb2VzIG5vdCBzdXBwb3J0IHNpZ25pbmcgYXV0aG9yaXphdGlvbiBlbnRyaWVzJyk7XG4gIH1cbn1cbiJdfQ==