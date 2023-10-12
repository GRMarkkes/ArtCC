import { getPublicKey, isConnected, signTransaction, signBlob, signAuthEntry } from '@stellar/freighter-api';
export const isFreighterInstalled = async () => isConnected();
export const freighterGetPublicKey = async () => {
    if (!isConnected()) {
        throw new Error(`Freighter is not connected`);
    }
    return getPublicKey();
};
export const freighterSignTransaction = async (params) => {
    if (!isConnected()) {
        throw new Error(`Freighter is not connected`);
    }
    return signTransaction(params.xdr, {
        accountToSign: params.accountToSign,
        networkPassphrase: params.networkPassphrase,
    });
};
export const freighterSignBlob = async (params) => {
    if (!isConnected()) {
        throw new Error(`Freighter is not connected`);
    }
    return signBlob(params.b64blob, {
        accountToSign: params.accountToSign
    });
};
export const freighterSignAuthEntry = async (params) => {
    if (!isConnected()) {
        throw new Error(`Freighter is not connected`);
    }
    return signAuthEntry(params.entryPreimageXDR, {
        accountToSign: params.accountToSign
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlaWdodGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mcmVpZ2h0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFlBQVksRUFDWixXQUFXLEVBQ1gsZUFBZSxFQUNmLFFBQVEsRUFDUixhQUFhLEVBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEtBQUssSUFBcUIsRUFBRTtJQUMvRCxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxZQUFZLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQzNDLE1BQThCLEVBQ2IsRUFBRTtJQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNqQyxhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7UUFDbkMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtLQUM1QyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQWdDLEVBQ2YsRUFBRTtJQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUM5QixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7S0FDcEMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUN6QyxNQUFxQyxFQUNwQixFQUFFO0lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7UUFDNUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO0tBQ3BDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGdldFB1YmxpY0tleSxcbiAgaXNDb25uZWN0ZWQsXG4gIHNpZ25UcmFuc2FjdGlvbixcbiAgc2lnbkJsb2IsXG4gIHNpZ25BdXRoRW50cnlcbn0gZnJvbSAnQHN0ZWxsYXIvZnJlaWdodGVyLWFwaSc7XG5cbmV4cG9ydCBjb25zdCBpc0ZyZWlnaHRlckluc3RhbGxlZCA9IGFzeW5jICgpID0+IGlzQ29ubmVjdGVkKCk7XG5cbmV4cG9ydCBjb25zdCBmcmVpZ2h0ZXJHZXRQdWJsaWNLZXkgPSBhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgaWYgKCFpc0Nvbm5lY3RlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBGcmVpZ2h0ZXIgaXMgbm90IGNvbm5lY3RlZGApO1xuICB9XG5cbiAgcmV0dXJuIGdldFB1YmxpY0tleSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZyZWlnaHRlclNpZ25UcmFuc2FjdGlvbiA9IGFzeW5jIChcbiAgcGFyYW1zOiBJRnJlaWdodGVyU2lnblR4UGFyYW1zXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBpZiAoIWlzQ29ubmVjdGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZyZWlnaHRlciBpcyBub3QgY29ubmVjdGVkYCk7XG4gIH1cblxuICByZXR1cm4gc2lnblRyYW5zYWN0aW9uKHBhcmFtcy54ZHIsIHtcbiAgICBhY2NvdW50VG9TaWduOiBwYXJhbXMuYWNjb3VudFRvU2lnbixcbiAgICBuZXR3b3JrUGFzc3BocmFzZTogcGFyYW1zLm5ldHdvcmtQYXNzcGhyYXNlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmcmVpZ2h0ZXJTaWduQmxvYiA9IGFzeW5jIChcbiAgcGFyYW1zOiBJRnJlaWdodGVyU2lnbkJsb2JQYXJhbXNcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmICghaXNDb25uZWN0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRnJlaWdodGVyIGlzIG5vdCBjb25uZWN0ZWRgKTtcbiAgfVxuXG4gIHJldHVybiBzaWduQmxvYihwYXJhbXMuYjY0YmxvYiwge1xuICAgIGFjY291bnRUb1NpZ246IHBhcmFtcy5hY2NvdW50VG9TaWduXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZyZWlnaHRlclNpZ25BdXRoRW50cnkgPSBhc3luYyAoXG4gIHBhcmFtczogSUZyZWlnaHRlclNpZ25BdXRoRW50cnlQYXJhbXNcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmICghaXNDb25uZWN0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRnJlaWdodGVyIGlzIG5vdCBjb25uZWN0ZWRgKTtcbiAgfVxuXG4gIHJldHVybiBzaWduQXV0aEVudHJ5KHBhcmFtcy5lbnRyeVByZWltYWdlWERSLCB7XG4gICAgYWNjb3VudFRvU2lnbjogcGFyYW1zLmFjY291bnRUb1NpZ25cbiAgfSk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElGcmVpZ2h0ZXJTaWduVHhQYXJhbXMge1xuICB4ZHI6IHN0cmluZztcbiAgYWNjb3VudFRvU2lnbj86IHN0cmluZztcbiAgbmV0d29ya1Bhc3NwaHJhc2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnJlaWdodGVyU2lnbkJsb2JQYXJhbXMge1xuICBiNjRibG9iOiBzdHJpbmc7XG4gIGFjY291bnRUb1NpZ24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZyZWlnaHRlclNpZ25BdXRoRW50cnlQYXJhbXMge1xuICBlbnRyeVByZWltYWdlWERSOiBzdHJpbmc7XG4gIGFjY291bnRUb1NpZ24/OiBzdHJpbmc7XG59XG4iXX0=