export const isRabetAvailable = () => !!window.rabet;
export const rabetGetPublicKey = async () => {
    if (!window?.rabet) {
        throw new Error('Rabet is not installed');
    }
    return window.rabet.connect();
};
export const rabetSignTransaction = async (params) => {
    if (!window?.rabet) {
        throw new Error('Rabet is not installed');
    }
    return window.rabet.sign(params.xdr, params.network);
};
export var RabetNetwork;
(function (RabetNetwork) {
    RabetNetwork["PUBLIC"] = "mainnet";
    RabetNetwork["TESTNET"] = "testnet";
})(RabetNetwork || (RabetNetwork = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFiZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JhYmV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBRXJELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssSUFBb0MsRUFBRTtJQUMxRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDM0M7SUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsS0FBSyxFQUFFLE1BRzFDLEVBQTRCLEVBQUU7SUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLGtDQUFrQixDQUFBO0lBQ2xCLG1DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxZQUFZLEtBQVosWUFBWSxRQUd2QiIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgY29uc3Qgd2luZG93OiBXaW5kb3cgJlxuICB0eXBlb2YgZ2xvYmFsVGhpcyAmIHtcbiAgICByYWJldD86IHtcbiAgICAgIGNvbm5lY3Q6ICgpID0+IFByb21pc2U8eyBwdWJsaWNLZXk6IHN0cmluZyB9PjtcbiAgICAgIHNpZ246ICh4ZHI6IHN0cmluZywgbmV0d29yazogUmFiZXROZXR3b3JrKSA9PiB7IHhkcjogc3RyaW5nIH07XG4gICAgfTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGlzUmFiZXRBdmFpbGFibGUgPSAoKSA9PiAhIXdpbmRvdy5yYWJldDtcblxuZXhwb3J0IGNvbnN0IHJhYmV0R2V0UHVibGljS2V5ID0gYXN5bmMgKCk6IFByb21pc2U8eyBwdWJsaWNLZXk6IHN0cmluZyB9PiA9PiB7XG4gIGlmICghd2luZG93Py5yYWJldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmFiZXQgaXMgbm90IGluc3RhbGxlZCcpO1xuICB9XG5cbiAgcmV0dXJuIHdpbmRvdy5yYWJldC5jb25uZWN0KCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmFiZXRTaWduVHJhbnNhY3Rpb24gPSBhc3luYyAocGFyYW1zOiB7XG4gIHhkcjogc3RyaW5nO1xuICBuZXR3b3JrOiBSYWJldE5ldHdvcms7XG59KTogUHJvbWlzZTx7IHhkcjogc3RyaW5nIH0+ID0+IHtcbiAgaWYgKCF3aW5kb3c/LnJhYmV0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSYWJldCBpcyBub3QgaW5zdGFsbGVkJyk7XG4gIH1cblxuICByZXR1cm4gd2luZG93LnJhYmV0LnNpZ24ocGFyYW1zLnhkciwgcGFyYW1zLm5ldHdvcmspO1xufTtcblxuZXhwb3J0IGVudW0gUmFiZXROZXR3b3JrIHtcbiAgUFVCTElDID0gJ21haW5uZXQnLFxuICBURVNUTkVUID0gJ3Rlc3RuZXQnLFxufVxuIl19