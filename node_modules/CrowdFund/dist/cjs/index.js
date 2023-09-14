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
exports.getTokenAdmin = exports.getArtyToken = exports.getLaunchpadAcc = exports.getDevAcc = exports.getDonators = exports.donateToCampaign = exports.getCampaign = exports.getCampaigns = exports.createCampaign = exports.initialize = exports.Err = exports.Ok = void 0;
const soroban_client_1 = require("soroban-client");
const buffer_1 = require("buffer");
const convert_js_1 = require("./convert.js");
const invoke_js_1 = require("./invoke.js");
__exportStar(require("./constants.js"), exports);
__exportStar(require("./server.js"), exports);
__exportStar(require("./invoke.js"), exports);
;
;
class Ok {
    value;
    constructor(value) {
        this.value = value;
    }
    unwrapErr() {
        throw new Error('No error');
    }
    unwrap() {
        return this.value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return !this.isOk();
    }
}
exports.Ok = Ok;
class Err {
    error;
    constructor(error) {
        this.error = error;
    }
    unwrapErr() {
        return this.error;
    }
    unwrap() {
        throw new Error(this.error.message);
    }
    isOk() {
        return false;
    }
    isErr() {
        return !this.isOk();
    }
}
exports.Err = Err;
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
const regex = /ContractError\((\d+)\)/;
function getError(err) {
    const match = err.match(regex);
    if (!match) {
        return undefined;
    }
    if (Errors == undefined) {
        return undefined;
    }
    // @ts-ignore
    let i = parseInt(match[1], 10);
    if (i < Errors.length) {
        return new Err(Errors[i]);
    }
    return undefined;
}
const Errors = [
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" }
];
function CampaignToXdr(campaign) {
    if (!campaign) {
        return soroban_client_1.xdr.ScVal.scvVoid();
    }
    let arr = [
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("amount_collected"), val: ((i) => (0, convert_js_1.i128ToScVal)(i))(campaign["amount_collected"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("deadline"), val: ((i) => soroban_client_1.xdr.ScVal.scvU64(soroban_client_1.xdr.Uint64.fromString(i.toString())))(campaign["deadline"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("description"), val: ((i) => soroban_client_1.xdr.ScVal.scvString(i))(campaign["description"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("donations"), val: ((i) => soroban_client_1.xdr.ScVal.scvVec(i.map((i) => (0, convert_js_1.i128ToScVal)(i))))(campaign["donations"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("donators"), val: ((i) => soroban_client_1.xdr.ScVal.scvVec(i.map((i) => (0, convert_js_1.addressToScVal)(i))))(campaign["donators"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("id"), val: ((i) => soroban_client_1.xdr.ScVal.scvU32(i))(campaign["id"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("image"), val: ((i) => soroban_client_1.xdr.ScVal.scvString(i))(campaign["image"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("owner"), val: ((i) => (0, convert_js_1.addressToScVal)(i))(campaign["owner"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("status"), val: ((i) => soroban_client_1.xdr.ScVal.scvBool(i))(campaign["status"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("target"), val: ((i) => (0, convert_js_1.i128ToScVal)(i))(campaign["target"]) }),
        new soroban_client_1.xdr.ScMapEntry({ key: ((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("title"), val: ((i) => soroban_client_1.xdr.ScVal.scvString(i))(campaign["title"]) })
    ];
    return soroban_client_1.xdr.ScVal.scvMap(arr);
}
function CampaignFromXdr(base64Xdr) {
    let scVal = (0, convert_js_1.strToScVal)(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        amount_collected: (0, convert_js_1.scValToJs)(map.get("amount_collected")),
        deadline: (0, convert_js_1.scValToJs)(map.get("deadline")),
        description: (0, convert_js_1.scValToJs)(map.get("description")),
        donations: (0, convert_js_1.scValToJs)(map.get("donations")),
        donators: (0, convert_js_1.scValToJs)(map.get("donators")),
        id: (0, convert_js_1.scValToJs)(map.get("id")),
        image: (0, convert_js_1.scValToJs)(map.get("image")),
        owner: (0, convert_js_1.scValToJs)(map.get("owner")),
        status: (0, convert_js_1.scValToJs)(map.get("status")),
        target: (0, convert_js_1.scValToJs)(map.get("target")),
        title: (0, convert_js_1.scValToJs)(map.get("title"))
    };
}
function DataKeyToXdr(dataKey) {
    if (!dataKey) {
        return soroban_client_1.xdr.ScVal.scvVoid();
    }
    let res = [];
    switch (dataKey.tag) {
        case "DevAccount":
            res.push(((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("DevAccount"));
            break;
        case "LaunchpadAccount":
            res.push(((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("LaunchpadAccount"));
            break;
        case "ArtyToken":
            res.push(((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("ArtyToken"));
            break;
        case "TokenAdmin":
            res.push(((i) => soroban_client_1.xdr.ScVal.scvSymbol(i))("TokenAdmin"));
            break;
    }
    return soroban_client_1.xdr.ScVal.scvVec(res);
}
function DataKeyFromXdr(base64Xdr) {
    let [tag, values] = (0, convert_js_1.strToScVal)(base64Xdr).vec().map(convert_js_1.scValToJs);
    if (!tag) {
        throw new Error('Missing enum tag when decoding DataKey from XDR');
    }
    return { tag, values };
}
async function initialize({ dev_acc, launchpad_acc, arty_token, token_admin }, options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'initialize',
        args: [((i) => (0, convert_js_1.addressToScVal)(i))(dev_acc),
            ((i) => (0, convert_js_1.addressToScVal)(i))(launchpad_acc),
            ((i) => (0, convert_js_1.addressToScVal)(i))(arty_token),
            ((i) => (0, convert_js_1.addressToScVal)(i))(token_admin)],
        ...options,
        parseResultXdr: () => { },
    });
}
exports.initialize = initialize;
async function createCampaign({ owner_addr, title_cmp, desc_cmp, image_cmp, target_cmp, deadline_cmp }, options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'create_campaign',
        args: [((i) => (0, convert_js_1.addressToScVal)(i))(owner_addr),
            ((i) => soroban_client_1.xdr.ScVal.scvString(i))(title_cmp),
            ((i) => soroban_client_1.xdr.ScVal.scvString(i))(desc_cmp),
            ((i) => soroban_client_1.xdr.ScVal.scvString(i))(image_cmp),
            ((i) => (0, convert_js_1.i128ToScVal)(i))(target_cmp),
            ((i) => soroban_client_1.xdr.ScVal.scvU64(soroban_client_1.xdr.Uint64.fromString(i.toString())))(deadline_cmp)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok((0, convert_js_1.scValStrToJs)(xdr));
            }
            catch (e) {
                //@ts-ignore
                let err = getError(e.message);
                if (err) {
                    return err;
                }
                else {
                    throw e;
                }
            }
        },
    });
}
exports.createCampaign = createCampaign;
async function getCampaigns(options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_campaigns',
        ...options,
        parseResultXdr: (xdr) => {
            return (0, convert_js_1.scValStrToJs)(xdr);
        },
    });
}
exports.getCampaigns = getCampaigns;
async function getCampaign({ campaign_id }, options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_campaign',
        args: [((i) => soroban_client_1.xdr.ScVal.scvU32(i))(campaign_id)],
        ...options,
        parseResultXdr: (xdr) => {
            return CampaignFromXdr(xdr);
        },
    });
}
exports.getCampaign = getCampaign;
async function donateToCampaign({ id, donor_address, amount, token_id }, options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'donate_to_campaign',
        args: [((i) => soroban_client_1.xdr.ScVal.scvU32(i))(id),
            ((i) => (0, convert_js_1.addressToScVal)(i))(donor_address),
            ((i) => (0, convert_js_1.i128ToScVal)(i))(amount),
            ((i) => (0, convert_js_1.addressToScVal)(i))(token_id)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok((0, convert_js_1.scValStrToJs)(xdr));
            }
            catch (e) {
                //@ts-ignore
                let err = getError(e.message);
                if (err) {
                    return err;
                }
                else {
                    throw e;
                }
            }
        },
    });
}
exports.donateToCampaign = donateToCampaign;
async function getDonators({ id }, options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_donators',
        args: [((i) => soroban_client_1.xdr.ScVal.scvU32(i))(id)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok((0, convert_js_1.scValStrToJs)(xdr));
            }
            catch (e) {
                //@ts-ignore
                let err = getError(e.message);
                if (err) {
                    return err;
                }
                else {
                    throw e;
                }
            }
        },
    });
}
exports.getDonators = getDonators;
async function getDevAcc(options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_dev_acc',
        ...options,
        parseResultXdr: (xdr) => {
            return (0, convert_js_1.scValStrToJs)(xdr);
        },
    });
}
exports.getDevAcc = getDevAcc;
async function getLaunchpadAcc(options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_launchpad_acc',
        ...options,
        parseResultXdr: (xdr) => {
            return (0, convert_js_1.scValStrToJs)(xdr);
        },
    });
}
exports.getLaunchpadAcc = getLaunchpadAcc;
async function getArtyToken(options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_arty_token',
        ...options,
        parseResultXdr: (xdr) => {
            return (0, convert_js_1.scValStrToJs)(xdr);
        },
    });
}
exports.getArtyToken = getArtyToken;
async function getTokenAdmin(options = {}) {
    return await (0, invoke_js_1.invoke)({
        method: 'get_token_admin',
        ...options,
        parseResultXdr: (xdr) => {
            return (0, convert_js_1.scValStrToJs)(xdr);
        },
    });
}
exports.getTokenAdmin = getTokenAdmin;
