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
exports.Contract = exports.Errors = exports.networks = void 0;
const stellar_sdk_1 = require("stellar-sdk");
const buffer_1 = require("buffer");
const assembled_tx_js_1 = require("./assembled-tx.js");
__exportStar(require("./assembled-tx.js"), exports);
__exportStar(require("./method-options.js"), exports);
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
exports.networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CACPJOTDGFBGFOOIGQ4H2CTWL75XBEYRHDBO3IHM7XLF22MPHFPW2SND",
    }
};
/**
    
    */
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
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new stellar_sdk_1.ContractSpec([
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACAAAAAAAAAAWRGVhZGxpbmVTaG91bGRCZUZ1dHVyZQAAAAAAAQAAAAAAAAAQQ2FtcGFpZ25Ob3RFeGlzdAAAAAIAAAAAAAAAEUFtb3VudE11c3ROb25aZXJvAAAAAAAAAwAAAAAAAAANVGFyZ2V0UmVhY2hlZAAAAAAAAAQAAAAAAAAAF0Ftb3VudEV4Y2VlZFRhcmdldExpbWl0AAAAAAUAAAAAAAAAFENhbXBhaWduQWxyZWFkeUV4aXN0AAAABgAAAAAAAAAVSWRDYW1wYWlnbk11c3ROb25aZXJvAAAAAAAABwAAAAAAAAAUTG93QW1vdW50Rm9yU3BsaXR0ZXIAAAAI",
            "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAADgAAAAAAAAAQYW1vdW50X2NvbGxlY3RlZAAAAAsAAAAAAAAACGNhdGVnb3J5AAAAEAAAAAAAAAAEZGF0ZQAAABAAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAJZG9uYXRpb25zAAAAAAAD6gAAAAsAAAAAAAAACGRvbmF0b3JzAAAD6gAAABMAAAAAAAAAAmlkAAAAAAAEAAAAAAAAAAVpbWFnZQAAAAAAABAAAAAAAAAADW1haW5fbG9jYXRpb24AAAAAAAAQAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAABnN0YXR1cwAAAAAAAQAAAAAAAAAGdGFyZ2V0AAAAAAALAAAAAAAAAAV0aXRsZQAAAAAAABA=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAACkRldkFjY291bnQAAAAAAAAAAAAAAAAAEExhdW5jaHBhZEFjY291bnQAAAAAAAAAAAAAAAlBcnR5VG9rZW4AAAAAAAAAAAAAAAAAAApUb2tlbkFkbWluAAA=",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABAAAAAAAAAAHZGV2X2FjYwAAAAATAAAAAAAAAA1sYXVuY2hwYWRfYWNjAAAAAAAAEwAAAAAAAAAKYXJ0eV90b2tlbgAAAAAAEwAAAAAAAAALdG9rZW5fYWRtaW4AAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAkAAAAAAAAACm93bmVyX2FkZHIAAAAAABMAAAAAAAAACXRpdGxlX2NtcAAAAAAAABAAAAAAAAAACGRlc2NfY21wAAAAEAAAAAAAAAAMY2F0ZWdvcnlfY21wAAAAEAAAAAAAAAARbWFpbl9sb2NhdGlvbl9jbXAAAAAAAAAQAAAAAAAAAAhkYXRlX2NtcAAAABAAAAAAAAAACWltYWdlX2NtcAAAAAAAABAAAAAAAAAACnRhcmdldF9jbXAAAAAAAAsAAAAAAAAADGRlYWRsaW5lX2NtcAAAAAYAAAABAAAD6QAAB9AAAAAIQ2FtcGFpZ24AAAAD",
            "AAAAAAAAAAAAAAANZ2V0X2NhbXBhaWducwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIQ2FtcGFpZ24=",
            "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAEAAAfQAAAACENhbXBhaWdu",
            "AAAAAAAAAAAAAAASZG9uYXRlX3RvX2NhbXBhaWduAAAAAAAEAAAAAAAAAAJpZAAAAAAABAAAAAAAAAANZG9ub3JfYWRkcmVzcwAAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAIdG9rZW5faWQAAAATAAAAAQAAA+kAAAPtAAAAAwAAAAsAAAALAAAACwAAAAM=",
            "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0b3JzAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6QAAA+oAAAATAAAAAw==",
            "AAAAAAAAAAAAAAALZ2V0X2Rldl9hY2MAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAARZ2V0X2xhdW5jaHBhZF9hY2MAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAOZ2V0X2FydHlfdG9rZW4AAAAAAAAAAAABAAAAEw==",
            "AAAAAAAAAAAAAAAPZ2V0X3Rva2VuX2FkbWluAAAAAAAAAAABAAAAEw=="
        ]);
    }
    parsers = {
        initialize: () => { },
        createCampaign: (result) => {
            if (result instanceof assembled_tx_js_1.Err)
                return result;
            return new assembled_tx_js_1.Ok(this.spec.funcResToNative("create_campaign", result));
        },
        getCampaigns: (result) => this.spec.funcResToNative("get_campaigns", result),
        getCampaign: (result) => this.spec.funcResToNative("get_campaign", result),
        donateToCampaign: (result) => {
            if (result instanceof assembled_tx_js_1.Err)
                return result;
            return new assembled_tx_js_1.Ok(this.spec.funcResToNative("donate_to_campaign", result));
        },
        getDonators: (result) => {
            if (result instanceof assembled_tx_js_1.Err)
                return result;
            return new assembled_tx_js_1.Ok(this.spec.funcResToNative("get_donators", result));
        },
        getDevAcc: (result) => this.spec.funcResToNative("get_dev_acc", result),
        getLaunchpadAcc: (result) => this.spec.funcResToNative("get_launchpad_acc", result),
        getArtyToken: (result) => this.spec.funcResToNative("get_arty_token", result),
        getTokenAdmin: (result) => this.spec.funcResToNative("get_token_admin", result)
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return assembled_tx_js_1.AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        initialize: (this.txFromJSON),
        createCampaign: (this.txFromJSON),
        getCampaigns: (this.txFromJSON),
        getCampaign: (this.txFromJSON),
        donateToCampaign: (this.txFromJSON),
        getDonators: (this.txFromJSON),
        getDevAcc: (this.txFromJSON),
        getLaunchpadAcc: (this.txFromJSON),
        getArtyToken: (this.txFromJSON),
        getTokenAdmin: (this.txFromJSON)
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize = async ({ dev_acc, launchpad_acc, arty_token, token_admin }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { dev_acc: new stellar_sdk_1.Address(dev_acc), launchpad_acc: new stellar_sdk_1.Address(launchpad_acc), arty_token: new stellar_sdk_1.Address(arty_token), token_admin: new stellar_sdk_1.Address(token_admin) }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    };
    /**
* Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createCampaign = async ({ owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, date_cmp, image_cmp, target_cmp, deadline_cmp }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'create_campaign',
            args: this.spec.funcArgsToScVals("create_campaign", { owner_addr: new stellar_sdk_1.Address(owner_addr), title_cmp, desc_cmp, category_cmp, main_location_cmp, date_cmp, image_cmp, target_cmp, deadline_cmp }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['createCampaign'],
        });
    };
    /**
* Construct and simulate a get_campaigns transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getCampaigns = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_campaigns',
            args: this.spec.funcArgsToScVals("get_campaigns", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getCampaigns'],
        });
    };
    /**
* Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getCampaign = async ({ campaign_id }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_campaign',
            args: this.spec.funcArgsToScVals("get_campaign", { campaign_id }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getCampaign'],
        });
    };
    /**
* Construct and simulate a donate_to_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    donateToCampaign = async ({ id, donor_address, amount, token_id }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'donate_to_campaign',
            args: this.spec.funcArgsToScVals("donate_to_campaign", { id, donor_address: new stellar_sdk_1.Address(donor_address), amount, token_id: new stellar_sdk_1.Address(token_id) }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['donateToCampaign'],
        });
    };
    /**
* Construct and simulate a get_donators transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getDonators = async ({ id }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_donators',
            args: this.spec.funcArgsToScVals("get_donators", { id }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getDonators'],
        });
    };
    /**
* Construct and simulate a get_dev_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getDevAcc = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_dev_acc',
            args: this.spec.funcArgsToScVals("get_dev_acc", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getDevAcc'],
        });
    };
    /**
* Construct and simulate a get_launchpad_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getLaunchpadAcc = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_launchpad_acc',
            args: this.spec.funcArgsToScVals("get_launchpad_acc", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getLaunchpadAcc'],
        });
    };
    /**
* Construct and simulate a get_arty_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getArtyToken = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_arty_token',
            args: this.spec.funcArgsToScVals("get_arty_token", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getArtyToken'],
        });
    };
    /**
* Construct and simulate a get_token_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getTokenAdmin = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'get_token_admin',
            args: this.spec.funcArgsToScVals("get_token_admin", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['getTokenAdmin'],
        });
    };
}
exports.Contract = Contract;
