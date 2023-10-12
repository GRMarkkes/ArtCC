import { ContractSpec, Address } from 'soroban-client';
import { Buffer } from "buffer";
import { invoke } from './invoke.js';
export * from './invoke.js';
export * from './method-options.js';
export { Address };
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
const regex = /Error\(Contract, #(\d+)\)/;
function parseError(message) {
    const match = message.match(regex);
    if (!match) {
        return undefined;
    }
    if (Errors === undefined) {
        return undefined;
    }
    let i = parseInt(match[1], 10);
    let err = Errors[i];
    if (err) {
        return new Err(err);
    }
    return undefined;
}
export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CDVKXAJB2UZYVETKZSKEFXAGKEB2D3GBLVWKQ25UE5LSYBNLDWVJFT6O",
    }
};
const Errors = {
    1: { message: "" },
    2: { message: "" },
    3: { message: "" },
    4: { message: "" },
    5: { message: "" },
    6: { message: "" },
    7: { message: "" },
    8: { message: "" }
};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
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
    async initialize({ dev_acc, launchpad_acc, arty_token, token_admin }, options = {}) {
        return await invoke({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { dev_acc, launchpad_acc, arty_token, token_admin }),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    }
    async createCampaign({ owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, date_cmp, image_cmp, target_cmp, deadline_cmp }, options = {}) {
        try {
            return await invoke({
                method: 'create_campaign',
                args: this.spec.funcArgsToScVals("create_campaign", { owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, date_cmp, image_cmp, target_cmp, deadline_cmp }),
                ...options,
                ...this.options,
                parseResultXdr: (xdr) => {
                    return new Ok(this.spec.funcResToNative("create_campaign", xdr));
                },
            });
        }
        catch (e) {
            if (typeof e === 'string') {
                let err = parseError(e);
                if (err)
                    return err;
            }
            throw e;
        }
    }
    async getCampaigns(options = {}) {
        return await invoke({
            method: 'get_campaigns',
            args: this.spec.funcArgsToScVals("get_campaigns", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_campaigns", xdr);
            },
        });
    }
    async getCampaign({ campaign_id }, options = {}) {
        return await invoke({
            method: 'get_campaign',
            args: this.spec.funcArgsToScVals("get_campaign", { campaign_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_campaign", xdr);
            },
        });
    }
    async donateToCampaign({ id, donor_address, amount, token_id }, options = {}) {
        try {
            return await invoke({
                method: 'donate_to_campaign',
                args: this.spec.funcArgsToScVals("donate_to_campaign", { id, donor_address, amount, token_id }),
                ...options,
                ...this.options,
                parseResultXdr: (xdr) => {
                    return new Ok(this.spec.funcResToNative("donate_to_campaign", xdr));
                },
            });
        }
        catch (e) {
            if (typeof e === 'string') {
                let err = parseError(e);
                if (err)
                    return err;
            }
            throw e;
        }
    }
    async getDonators({ id }, options = {}) {
        try {
            return await invoke({
                method: 'get_donators',
                args: this.spec.funcArgsToScVals("get_donators", { id }),
                ...options,
                ...this.options,
                parseResultXdr: (xdr) => {
                    return new Ok(this.spec.funcResToNative("get_donators", xdr));
                },
            });
        }
        catch (e) {
            if (typeof e === 'string') {
                let err = parseError(e);
                if (err)
                    return err;
            }
            throw e;
        }
    }
    async getDevAcc(options = {}) {
        return await invoke({
            method: 'get_dev_acc',
            args: this.spec.funcArgsToScVals("get_dev_acc", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_dev_acc", xdr);
            },
        });
    }
    async getLaunchpadAcc(options = {}) {
        return await invoke({
            method: 'get_launchpad_acc',
            args: this.spec.funcArgsToScVals("get_launchpad_acc", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_launchpad_acc", xdr);
            },
        });
    }
    async getArtyToken(options = {}) {
        return await invoke({
            method: 'get_arty_token',
            args: this.spec.funcArgsToScVals("get_arty_token", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_arty_token", xdr);
            },
        });
    }
    async getTokenAdmin(options = {}) {
        return await invoke({
            method: 'get_token_admin',
            args: this.spec.funcArgsToScVals("get_token_admin", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_token_admin", xdr);
            },
        });
    }
}