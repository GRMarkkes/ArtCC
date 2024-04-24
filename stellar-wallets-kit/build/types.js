export var WalletNetwork;
(function (WalletNetwork) {
    WalletNetwork["PUBLIC"] = "Public Global Stellar Network ; September 2015";
    WalletNetwork["TESTNET"] = "Test SDF Network ; September 2015";
    WalletNetwork["FUTURENET"] = "Test SDF Future Network ; October 2022";
    WalletNetwork["SANDBOX"] = "Local Sandbox Stellar Network ; September 2022";
    WalletNetwork["STANDALONE"] = "Standalone Network ; February 2017";
})(WalletNetwork || (WalletNetwork = {}));
export var ModuleType;
(function (ModuleType) {
    ModuleType["HW_WALLET"] = "HW_WALLET";
    ModuleType["HOT_WALLET"] = "HOT_WALLET";
    ModuleType["BRIDGE_WALLET"] = "BRIDGE_WALLET";
    ModuleType["AIR_GAPED_WALLET"] = "AIR_GAPED_WALLET";
})(ModuleType || (ModuleType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJBLE1BQU0sQ0FBTixJQUFZLGFBTVg7QUFORCxXQUFZLGFBQWE7SUFDdkIsMEVBQXlELENBQUE7SUFDekQsOERBQTZDLENBQUE7SUFDN0MscUVBQW9ELENBQUE7SUFDcEQsMkVBQTBELENBQUE7SUFDMUQsa0VBQWlELENBQUE7QUFDbkQsQ0FBQyxFQU5XLGFBQWEsS0FBYixhQUFhLFFBTXhCO0FBRUQsTUFBTSxDQUFOLElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNwQixxQ0FBdUIsQ0FBQTtJQUN2Qix1Q0FBeUIsQ0FBQTtJQUN6Qiw2Q0FBK0IsQ0FBQTtJQUMvQixtREFBcUMsQ0FBQTtBQUN2QyxDQUFDLEVBTFcsVUFBVSxLQUFWLFVBQVUsUUFLckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXByZWNhdGVkIC0gVGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2VzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVN0ZWxsYXJXYWxsZXRzU2lnbkJsb2Ige1xuICBibG9iOiBzdHJpbmc7XG4gIHB1YmxpY0tleT86IHN0cmluZztcbiAgbmV0d29yaz86IFdhbGxldE5ldHdvcms7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgLSBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmUgcmVsZWFzZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJU3RlbGxhcldhbGxldHNTaWduQXV0aEVudHJ5IHtcbiAgZW50cnlQcmVpbWFnZVhEUjogc3RyaW5nO1xuICBwdWJsaWNLZXk/OiBzdHJpbmc7XG4gIG5ldHdvcms/OiBXYWxsZXROZXR3b3JrO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIC0gVGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2VzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVN0ZWxsYXJXYWxsZXRzU2lnblR4IHtcbiAgeGRyOiBzdHJpbmc7XG4gIHB1YmxpY0tleT86IHN0cmluZztcbiAgbmV0d29yaz86IFdhbGxldE5ldHdvcms7XG59XG5cbmV4cG9ydCBlbnVtIFdhbGxldE5ldHdvcmsge1xuICBQVUJMSUMgPSAnUHVibGljIEdsb2JhbCBTdGVsbGFyIE5ldHdvcmsgOyBTZXB0ZW1iZXIgMjAxNScsXG4gIFRFU1RORVQgPSAnVGVzdCBTREYgTmV0d29yayA7IFNlcHRlbWJlciAyMDE1JyxcbiAgRlVUVVJFTkVUID0gJ1Rlc3QgU0RGIEZ1dHVyZSBOZXR3b3JrIDsgT2N0b2JlciAyMDIyJyxcbiAgU0FOREJPWCA9ICdMb2NhbCBTYW5kYm94IFN0ZWxsYXIgTmV0d29yayA7IFNlcHRlbWJlciAyMDIyJyxcbiAgU1RBTkRBTE9ORSA9ICdTdGFuZGFsb25lIE5ldHdvcmsgOyBGZWJydWFyeSAyMDE3Jyxcbn1cblxuZXhwb3J0IGVudW0gTW9kdWxlVHlwZSB7XG4gIEhXX1dBTExFVCA9ICdIV19XQUxMRVQnLFxuICBIT1RfV0FMTEVUID0gJ0hPVF9XQUxMRVQnLFxuICBCUklER0VfV0FMTEVUID0gJ0JSSURHRV9XQUxMRVQnLFxuICBBSVJfR0FQRURfV0FMTEVUID0gJ0FJUl9HQVBFRF9XQUxMRVQnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdXBwb3J0ZWRXYWxsZXQge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgaXNBdmFpbGFibGU6IGJvb2xlYW47XG4gIGljb246IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIEtpdCBBY3Rpb25zIGFyZSB0aGUgbWV0aG9kcyB0aGUga2l0IHVzZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBXYWxsZXQvU2VydmljZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEtpdEFjdGlvbnMge1xuICAvKipcbiAgICogRnVuY3Rpb24gdXNlZCB0byByZXF1ZXN0IHRoZSBwdWJsaWMga2V5IGZyb20gdGhlIGFjdGl2ZSBhY2NvdW50IG9yXG4gICAqIHNwZWNpZmljIHBhdGggb24gYSB3YWxsZXQuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICogQHBhcmFtIHBhcmFtcy5wYXRoIC0gVGhlIHBhdGggdG8gdGVsbCB0aGUgd2FsbGV0IHdoaWNoIHBvc2l0aW9uIHRvIGFzay5cbiAgICogVGhpcyBpcyBjb21tb25seSB1c2VkIGluIGJvdGggaGFyZHdhcmUgd2FsbGV0cyBhbmQgYWlyIGdhcGVkIHdhbGxldHMuXG4gICAqL1xuICBnZXRQdWJsaWNLZXkocGFyYW1zPzogeyBwYXRoPzogc3RyaW5nIH0pOiBQcm9taXNlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gcmVxdWVzdCBhIHdhbGxldCB0byBzaWduIGEgYnVpbHQgdHJhbnNhY3Rpb24gaW4gaXRzIFhEUiBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqIEBwYXJhbSBwYXJhbXMueGRyIC0gVGhlIHRyYW5zYWN0aW9uIHRvIHNpZ24sIHRoaXMgdHJhbnNhY3Rpb24gbXVzdCBiZSB2YWxpZFxuICAgKiBhbmQgaW50byBhIGJhc2U2NCB4ZHIgZm9ybWF0XG4gICAqIEBwYXJhbSBwYXJhbXMucHVibGljS2V5cyAtIEFuIGFycmF5IHdpdGggYWxsIHRoZSBwdWJsaWMga2V5cyB0aGUgd2FsbGV0XG4gICAqIHNob3VsZCB1c2UgdG8gc2lnbiB0aGUgdHJhbnNhY3Rpb24uIElmIHRoZSB3YWxsZXQgZG9lc24ndCBhbGxvdyBtdWx0aXBsZVxuICAgKiBzaWduYXR1cmVzIGF0IG9uY2UsIHRoZSBtb2R1bGUgc2hvdWxkIHRha2UgY2FyZSBvZiBpdC5cbiAgICogQHBhcmFtIHBhcmFtcy5uZXR3b3JrIC0gVGhlIG5ldHdvcmsgdG8gdXNlIHdoZW4gc2lnbmluZyB0aGUgdHJhbnNhY3Rpb25cbiAgICpcbiAgICogQHJldHVybiByZXNwb25zZSAtIFByb21pc2VcbiAgICogQHJldHVybiByZXNwb25zZS5yZXN1bHQgLSBTaWduZWQgeGRyIGluIGJhc2U2NCBmb3JtYXRcbiAgICovXG4gIHNpZ25UeChwYXJhbXM6IHsgeGRyOiBzdHJpbmc7IHB1YmxpY0tleXM6IHN0cmluZ1tdOyBuZXR3b3JrOiBXYWxsZXROZXR3b3JrIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gcmVxdWVzdCBhIHdhbGxldCB0byBzaWduIGEgcmFuZG9tIGJsb2IuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICogQHBhcmFtIHBhcmFtcy5ibG9iIC0gVGhlIGJsb2IgdG8gc2lnbiwgdGhpcyBibG9iIG5lZWRzIHRvIGJlIGluIGJhc2U2NFxuICAgKiBAcGFyYW0gcGFyYW1zLnB1YmxpY0tleSAtIFB1YmxpYyBrZXkgdGhlIHdhbGxldCBzaG91bGQgdXNlIHRvIHNpZ24sIGlmXG4gICAqIG5vIHB1YmxpYyBrZXkgaXMgcHJvdmlkZWQsIHRoZSB3YWxsZXQgc2hvdWxkIHRoZSBvbmUgYmVpbmcgdXNlZCBieSB0aGUgdXNlci5cbiAgICpcbiAgICogQHJldHVybiByZXNwb25zZSAtIFByb21pc2VcbiAgICogQHJldHVybiByZXNwb25zZS5yZXN1bHQgLSBTaWduYXR1cmUgQnVmZmVyIGluIGEgc3RyaW5nIGZvcm1hdFxuICAgKi9cbiAgc2lnbkJsb2IocGFyYW1zOiB7IGJsb2I6IHN0cmluZzsgcHVibGljS2V5Pzogc3RyaW5nIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gcmVxdWVzdCBhIHdhbGxldCB0byBzaWduIGEgcmFuZG9tIGJsb2IuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICogQHBhcmFtIHBhcmFtcy5lbnRyeVByZWltYWdlWERSIC0gQXV0aG9yaXphdGlvbiBlbnRyeSBpbWFnZSBpbiBpdHNcbiAgICogeGRyIGJhc2U2NCBmb3JtYXRcbiAgICogQHBhcmFtIHBhcmFtcy5wdWJsaWNLZXkgLSBQdWJsaWMga2V5IHRoZSB3YWxsZXQgc2hvdWxkIHVzZSB0byBzaWduLCBpZlxuICAgKiBubyBwdWJsaWMga2V5IGlzIHByb3ZpZGVkLCB0aGUgd2FsbGV0IHNob3VsZCB0aGUgb25lIGJlaW5nIHVzZWQgYnkgdGhlIHVzZXIuXG4gICAqXG4gICAqIEByZXR1cm4gcmVzcG9uc2UgLSBQcm9taXNlXG4gICAqIEByZXR1cm4gcmVzcG9uc2UucmVzdWx0IC0gU2lnbmF0dXJlIGhhc2hcbiAgICovXG4gIHNpZ25BdXRoRW50cnkocGFyYW1zOiB7IGVudHJ5UHJlaW1hZ2VYRFI6IHN0cmluZzsgcHVibGljS2V5Pzogc3RyaW5nIH0pOiBQcm9taXNlPHsgcmVzdWx0OiBzdHJpbmcgfT47XG59XG5cbi8qKlxuICogQSBtb2R1bGUgaXMgYSBcInBsdWdpblwiIHdlIGNhbiB1c2Ugd2l0aGluIHRoZSBraXQgc28gaXMgYWJsZSB0byBoYW5kbGUgYVxuICogc3BlY2lmaWMgdHlwZSBvZiB3YWxsZXQvc2VydmljZS4gVGhlcmUgYXJlIHNvbWUgbW9kdWxlcyB0aGF0IGFyZSBhbHJlYWR5XG4gKiBpbiB0aGUga2l0IGJ1dCBhbnkgd2FsbGV0IGRldmVsb3BlciBjYW4gY3JlYXRlIHRoZWlyIG93biBwbHVnaW5zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlSW50ZXJmYWNlIGV4dGVuZHMgS2l0QWN0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgTW9kdWxlIHR5cGUgaXMgdXNlZCBmb3IgZmlsdGVyaW5nIHB1cnBvc2VzLCBkZWZpbmUgdGhlIGNvcnJlY3Qgb25lIGluXG4gICAqIHlvdXIgbW9kdWxlIHNvIHdlIGRpc3BsYXkgaXQgYWNjb3JkaW5nbHlcbiAgICovXG4gIG1vZHVsZVR5cGU6IE1vZHVsZVR5cGU7XG5cbiAgLyoqXG4gICAqIFRoaXMgSUQgb2YgdGhlIG1vZHVsZSwgeW91IHNob3VsZCBleHBvc2UgdGhpcyBJRCBhcyBhIGNvbnN0YW50IHZhcmlhYmxlXG4gICAqIHNvIGRldmVsb3BlcnMgY2FuIHVzZSBpdCB0byBzaG93L2ZpbHRlciB0aGlzIG1vZHVsZSBpZiB0aGV5IG5lZWQgdG8uXG4gICAqL1xuICBwcm9kdWN0SWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgbmFtZSB0aGUga2l0IHdpbGwgc2hvdyBpbiB0aGUgYnVpbHRpbiBNb2RhbC5cbiAgICovXG4gIHByb2R1Y3ROYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIFVSTCB3aGVyZSB1c2VycyBjYW4gZWl0aGVyIGRvd25sb2FkLCBidXkgYW5kIGp1c3Qga25vdyBob3cgdG9cbiAgICogZ2V0IHRoZSBwcm9kdWN0LlxuICAgKi9cbiAgcHJvZHVjdFVybDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGlzIGljb24gd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGJ1aWx0aW4gTW9kYWwgYWxvbmcgd2l0aCB0aGUgcHJvZHVjdCBuYW1lLlxuICAgKi9cbiAgcHJvZHVjdEljb246IHN0cmluZztcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHRydWUgaXMgdGhlIHdhbGxldCBpcyBpbnN0YWxsZWQgYW5kL29yIGF2YWlsYWJsZS5cbiAgICogSWYgZm9yIGV4YW1wbGUgdGhpcyB3YWxsZXQvc2VydmljZSBkb2Vzbid0IG5lZWQgdG8gYmUgaW5zdGFsbGVkIHRvIGJlIHVzZWQsXG4gICAqIHJldHVybiBgdHJ1ZWAuXG4gICAqL1xuICBpc0F2YWlsYWJsZSgpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuIl19