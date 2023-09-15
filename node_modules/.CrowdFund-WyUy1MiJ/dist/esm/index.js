import { xdr } from 'soroban-client';
import { Buffer } from "buffer";
import { scValStrToJs, scValToJs, addressToScVal, i128ToScVal, strToScVal } from './convert.js';
import { invoke } from './invoke.js';
export * from './constants.js';
export * from './server.js';
export * from './invoke.js';
;
;
export class Ok {
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
export class Err {
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
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
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
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("amount_collected"), val: ((i) => i128ToScVal(i))(campaign["amount_collected"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("deadline"), val: ((i) => xdr.ScVal.scvU64(xdr.Uint64.fromString(i.toString())))(campaign["deadline"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("description"), val: ((i) => xdr.ScVal.scvString(i))(campaign["description"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("donations"), val: ((i) => xdr.ScVal.scvVec(i.map((i) => i128ToScVal(i))))(campaign["donations"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("donators"), val: ((i) => xdr.ScVal.scvVec(i.map((i) => addressToScVal(i))))(campaign["donators"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("id"), val: ((i) => xdr.ScVal.scvU32(i))(campaign["id"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("image"), val: ((i) => xdr.ScVal.scvString(i))(campaign["image"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("owner"), val: ((i) => addressToScVal(i))(campaign["owner"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("status"), val: ((i) => xdr.ScVal.scvBool(i))(campaign["status"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("target"), val: ((i) => i128ToScVal(i))(campaign["target"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("title"), val: ((i) => xdr.ScVal.scvString(i))(campaign["title"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function CampaignFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        amount_collected: scValToJs(map.get("amount_collected")),
        deadline: scValToJs(map.get("deadline")),
        description: scValToJs(map.get("description")),
        donations: scValToJs(map.get("donations")),
        donators: scValToJs(map.get("donators")),
        id: scValToJs(map.get("id")),
        image: scValToJs(map.get("image")),
        owner: scValToJs(map.get("owner")),
        status: scValToJs(map.get("status")),
        target: scValToJs(map.get("target")),
        title: scValToJs(map.get("title"))
    };
}
function DataKeyToXdr(dataKey) {
    if (!dataKey) {
        return xdr.ScVal.scvVoid();
    }
    let res = [];
    switch (dataKey.tag) {
        case "DevAccount":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("DevAccount"));
            break;
        case "LaunchpadAccount":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("LaunchpadAccount"));
            break;
        case "ArtyToken":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("ArtyToken"));
            break;
        case "TokenAdmin":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("TokenAdmin"));
            break;
    }
    return xdr.ScVal.scvVec(res);
}
function DataKeyFromXdr(base64Xdr) {
    let [tag, values] = strToScVal(base64Xdr).vec().map(scValToJs);
    if (!tag) {
        throw new Error('Missing enum tag when decoding DataKey from XDR');
    }
    return { tag, values };
}
export async function initialize({ dev_acc, launchpad_acc, arty_token, token_admin }, options = {}) {
    return await invoke({
        method: 'initialize',
        args: [((i) => addressToScVal(i))(dev_acc),
            ((i) => addressToScVal(i))(launchpad_acc),
            ((i) => addressToScVal(i))(arty_token),
            ((i) => addressToScVal(i))(token_admin)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function createCampaign({ owner_addr, title_cmp, desc_cmp, image_cmp, target_cmp, deadline_cmp }, options = {}) {
    return await invoke({
        method: 'create_campaign',
        args: [((i) => addressToScVal(i))(owner_addr),
            ((i) => xdr.ScVal.scvString(i))(title_cmp),
            ((i) => xdr.ScVal.scvString(i))(desc_cmp),
            ((i) => xdr.ScVal.scvString(i))(image_cmp),
            ((i) => i128ToScVal(i))(target_cmp),
            ((i) => xdr.ScVal.scvU64(xdr.Uint64.fromString(i.toString())))(deadline_cmp)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok(scValStrToJs(xdr));
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
export async function getCampaigns(options = {}) {
    return await invoke({
        method: 'get_campaigns',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getCampaign({ campaign_id }, options = {}) {
    return await invoke({
        method: 'get_campaign',
        args: [((i) => xdr.ScVal.scvU32(i))(campaign_id)],
        ...options,
        parseResultXdr: (xdr) => {
            return CampaignFromXdr(xdr);
        },
    });
}
export async function donateToCampaign({ id, donor_address, amount, token_id }, options = {}) {
    return await invoke({
        method: 'donate_to_campaign',
        args: [((i) => xdr.ScVal.scvU32(i))(id),
            ((i) => addressToScVal(i))(donor_address),
            ((i) => i128ToScVal(i))(amount),
            ((i) => addressToScVal(i))(token_id)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok(scValStrToJs(xdr));
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
export async function getDonators({ id }, options = {}) {
    return await invoke({
        method: 'get_donators',
        args: [((i) => xdr.ScVal.scvU32(i))(id)],
        ...options,
        parseResultXdr: (xdr) => {
            try {
                return new Ok(scValStrToJs(xdr));
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
export async function getDevAcc(options = {}) {
    return await invoke({
        method: 'get_dev_acc',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getLaunchpadAcc(options = {}) {
    return await invoke({
        method: 'get_launchpad_acc',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getArtyToken(options = {}) {
    return await invoke({
        method: 'get_arty_token',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getTokenAdmin(options = {}) {
    return await invoke({
        method: 'get_token_admin',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
