"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Errors = exports.networks = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const buffer_1 = require("buffer");
const index_js_1 = require("@stellar/stellar-sdk/lib/contract_client/index.js");
__exportStar(require("@stellar/stellar-sdk"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/contract_client/index.js"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/rust_types/index.js"), exports);
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
exports.networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CARS7VK2FA2EDVOI446XSJSGXHDIU4D3GPWCDQ6OJZR7U3C3D6F7M4EX",
    }
};
exports.Errors = {
    1: { message: "" },
    2: { message: "" },
    3: { message: "" },
    4: { message: "" },
    5: { message: "" },
    6: { message: "" },
    7: { message: "" },
    8: { message: "" }
};
class Client extends index_js_1.ContractClient {
    options;
    constructor(options) {
        super(new stellar_sdk_1.ContractSpec(["AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACAAAAAAAAAAWRGVhZGxpbmVTaG91bGRCZUZ1dHVyZQAAAAAAAQAAAAAAAAAQQ2FtcGFpZ25Ob3RFeGlzdAAAAAIAAAAAAAAAEUFtb3VudE11c3ROb25aZXJvAAAAAAAAAwAAAAAAAAANVGFyZ2V0UmVhY2hlZAAAAAAAAAQAAAAAAAAAF0Ftb3VudEV4Y2VlZFRhcmdldExpbWl0AAAAAAUAAAAAAAAAFENhbXBhaWduQWxyZWFkeUV4aXN0AAAABgAAAAAAAAAVSWRDYW1wYWlnbk11c3ROb25aZXJvAAAAAAAABwAAAAAAAAAUTG93QW1vdW50Rm9yU3BsaXR0ZXIAAAAI",
            "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAADgAAAAAAAAAQYW1vdW50X2NvbGxlY3RlZAAAAAsAAAAAAAAACGNhdGVnb3J5AAAAEAAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAlkb25hdGlvbnMAAAAAAAPqAAAACwAAAAAAAAAIZG9uYXRvcnMAAAPqAAAAEwAAAAAAAAACaWQAAAAAAAQAAAAAAAAABWltYWdlAAAAAAAAEAAAAAAAAAANbWFpbl9sb2NhdGlvbgAAAAAAABAAAAAAAAAACG1ldGFkYXRhAAAAEAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAZzdGF0dXMAAAAAAAEAAAAAAAAABnRhcmdldAAAAAAACwAAAAAAAAAFdGl0bGUAAAAAAAAQ",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAACkRldkFjY291bnQAAAAAAAAAAAAAAAAAEExhdW5jaHBhZEFjY291bnQAAAAAAAAAAAAAAAlBcnR5VG9rZW4AAAAAAAAAAAAAAAAAAApUb2tlbkFkbWluAAA=",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABAAAAAAAAAAHZGV2X2FjYwAAAAATAAAAAAAAAA1sYXVuY2hwYWRfYWNjAAAAAAAAEwAAAAAAAAAKYXJ0eV90b2tlbgAAAAAAEwAAAAAAAAALdG9rZW5fYWRtaW4AAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAkAAAAAAAAACm93bmVyX2FkZHIAAAAAABMAAAAAAAAACXRpdGxlX2NtcAAAAAAAABAAAAAAAAAACGRlc2NfY21wAAAAEAAAAAAAAAAMY2F0ZWdvcnlfY21wAAAAEAAAAAAAAAARbWFpbl9sb2NhdGlvbl9jbXAAAAAAAAAQAAAAAAAAAAxtZXRhZGF0YV9jbXAAAAAQAAAAAAAAAAlpbWFnZV9jbXAAAAAAAAAQAAAAAAAAAAp0YXJnZXRfY21wAAAAAAALAAAAAAAAAAxkZWFkbGluZV9jbXAAAAAGAAAAAQAAA+kAAAfQAAAACENhbXBhaWduAAAAAw==",
            "AAAAAAAAAAAAAAANZ2V0X2NhbXBhaWducwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIQ2FtcGFpZ24=",
            "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAEAAAfQAAAACENhbXBhaWdu",
            "AAAAAAAAAAAAAAASZG9uYXRlX3RvX2NhbXBhaWduAAAAAAAEAAAAAAAAAAJpZAAAAAAABAAAAAAAAAANZG9ub3JfYWRkcmVzcwAAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAIdG9rZW5faWQAAAATAAAAAQAAA+kAAAPtAAAAAwAAAAsAAAALAAAACwAAAAM=",
            "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0b3JzAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6QAAA+oAAAATAAAAAw==",
            "AAAAAAAAAAAAAAALZ2V0X2Rldl9hY2MAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAARZ2V0X2xhdW5jaHBhZF9hY2MAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAOZ2V0X2FydHlfdG9rZW4AAAAAAAAAAAABAAAAEw==",
            "AAAAAAAAAAAAAAAPZ2V0X3Rva2VuX2FkbWluAAAAAAAAAAABAAAAEw=="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        create_campaign: (this.txFromJSON),
        get_campaigns: (this.txFromJSON),
        get_campaign: (this.txFromJSON),
        donate_to_campaign: (this.txFromJSON),
        get_donators: (this.txFromJSON),
        get_dev_acc: (this.txFromJSON),
        get_launchpad_acc: (this.txFromJSON),
        get_arty_token: (this.txFromJSON),
        get_token_admin: (this.txFromJSON)
    };
}
exports.Client = Client;
