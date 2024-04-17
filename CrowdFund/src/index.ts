import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction, Ok, Err } from './assembled-tx.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
  Error_,
  Result,
} from './assembled-tx.js';
import type { ClassOptions, XDR_BASE64 } from './method-options.js';

export * from './assembled-tx.js';
export * from './method-options.js';

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
    unknown: {
        networkPassphrase: "Public Global Stellar Network ; September 2015",
        contractId: "CBYMFAAA3OIFXXBHH7C2JKXDCNB547VGZSURPUPFDDSF2MBNYKJUZXMB",
    }
} as const

/**
    
    */
export const Errors = {
1: {message:""},
  2: {message:""},
  3: {message:""},
  4: {message:""},
  5: {message:""},
  6: {message:""},
  7: {message:""},
  8: {message:""}
}
/**
    
    */
export interface Campaign {
  /**
    
    */
amount_collected: i128;
  /**
    
    */
category: string;
  /**
    
    */
deadline: u64;
  /**
    
    */
description: string;
  /**
    
    */
donations: Array<i128>;
  /**
    
    */
donators: Array<string>;
  /**
    
    */
id: u32;
  /**
    
    */
image: string;
  /**
    
    */
main_location: string;
  /**
    
    */
metadata: string;
  /**
    
    */
owner: string;
  /**
    
    */
status: boolean;
  /**
    
    */
target: i128;
  /**
    
    */
title: string;
}

/**
    
    */
export type DataKey = {tag: "DevAccount", values: void} | {tag: "LaunchpadAccount", values: void} | {tag: "ArtyToken", values: void} | {tag: "TokenAdmin", values: void};


export class Contract {
    spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
        this.spec = new ContractSpec([
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACAAAAAAAAAAWRGVhZGxpbmVTaG91bGRCZUZ1dHVyZQAAAAAAAQAAAAAAAAAQQ2FtcGFpZ25Ob3RFeGlzdAAAAAIAAAAAAAAAEUFtb3VudE11c3ROb25aZXJvAAAAAAAAAwAAAAAAAAANVGFyZ2V0UmVhY2hlZAAAAAAAAAQAAAAAAAAAF0Ftb3VudEV4Y2VlZFRhcmdldExpbWl0AAAAAAUAAAAAAAAAFENhbXBhaWduQWxyZWFkeUV4aXN0AAAABgAAAAAAAAAVSWRDYW1wYWlnbk11c3ROb25aZXJvAAAAAAAABwAAAAAAAAAUTG93QW1vdW50Rm9yU3BsaXR0ZXIAAAAI",
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
        "AAAAAAAAAAAAAAAPZ2V0X3Rva2VuX2FkbWluAAAAAAAAAAABAAAAEw=="
        ]);
    }
    private readonly parsers = {
        initialize: () => {},
        createCampaign: (result: XDR_BASE64 | Err): Ok<Campaign> | Err<Error_> => {
            if (result instanceof Err) return result
            return new Ok(this.spec.funcResToNative("create_campaign", result))
        },
        getCampaigns: (result: XDR_BASE64): Array<Campaign> => this.spec.funcResToNative("get_campaigns", result),
        getCampaign: (result: XDR_BASE64): Campaign => this.spec.funcResToNative("get_campaign", result),
        donateToCampaign: (result: XDR_BASE64 | Err): Ok<readonly [i128, i128, i128]> | Err<Error_> => {
            if (result instanceof Err) return result
            return new Ok(this.spec.funcResToNative("donate_to_campaign", result))
        },
        getDonators: (result: XDR_BASE64 | Err): Ok<Array<string>> | Err<Error_> => {
            if (result instanceof Err) return result
            return new Ok(this.spec.funcResToNative("get_donators", result))
        },
        getDevAcc: (result: XDR_BASE64): string => this.spec.funcResToNative("get_dev_acc", result),
        getLaunchpadAcc: (result: XDR_BASE64): string => this.spec.funcResToNative("get_launchpad_acc", result),
        getArtyToken: (result: XDR_BASE64): string => this.spec.funcResToNative("get_arty_token", result),
        getTokenAdmin: (result: XDR_BASE64): string => this.spec.funcResToNative("get_token_admin", result)
    };
    private txFromJSON = <T>(json: string): AssembledTransaction<T> => {
        const { method, ...tx } = JSON.parse(json)
        return AssembledTransaction.fromJSON(
            {
                ...this.options,
                method,
                parseResultXdr: this.parsers[method],
            },
            tx,
        );
    }
    public readonly fromJSON = {
        initialize: this.txFromJSON<ReturnType<typeof this.parsers['initialize']>>,
        createCampaign: this.txFromJSON<ReturnType<typeof this.parsers['createCampaign']>>,
        getCampaigns: this.txFromJSON<ReturnType<typeof this.parsers['getCampaigns']>>,
        getCampaign: this.txFromJSON<ReturnType<typeof this.parsers['getCampaign']>>,
        donateToCampaign: this.txFromJSON<ReturnType<typeof this.parsers['donateToCampaign']>>,
        getDonators: this.txFromJSON<ReturnType<typeof this.parsers['getDonators']>>,
        getDevAcc: this.txFromJSON<ReturnType<typeof this.parsers['getDevAcc']>>,
        getLaunchpadAcc: this.txFromJSON<ReturnType<typeof this.parsers['getLaunchpadAcc']>>,
        getArtyToken: this.txFromJSON<ReturnType<typeof this.parsers['getArtyToken']>>,
        getTokenAdmin: this.txFromJSON<ReturnType<typeof this.parsers['getTokenAdmin']>>
    }
        /**
    * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    initialize = async ({dev_acc, launchpad_acc, arty_token, token_admin}: {dev_acc: string, launchpad_acc: string, arty_token: string, token_admin: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", {dev_acc: new Address(dev_acc), launchpad_acc: new Address(launchpad_acc), arty_token: new Address(arty_token), token_admin: new Address(token_admin)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    }


        /**
    * Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    createCampaign = async ({owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, metadata_cmp, image_cmp, target_cmp, deadline_cmp}: {owner_addr: string, title_cmp: string, desc_cmp: string, category_cmp: string, main_location_cmp: string, metadata_cmp: string, image_cmp: string, target_cmp: i128, deadline_cmp: u64}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'create_campaign',
            args: this.spec.funcArgsToScVals("create_campaign", {owner_addr: new Address(owner_addr), title_cmp, desc_cmp, category_cmp, main_location_cmp, metadata_cmp, image_cmp, target_cmp, deadline_cmp}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['createCampaign'],
        });
    }


        /**
    * Construct and simulate a get_campaigns transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getCampaigns = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_campaigns',
            args: this.spec.funcArgsToScVals("get_campaigns", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getCampaigns'],
        });
    }


        /**
    * Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getCampaign = async ({campaign_id}: {campaign_id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_campaign',
            args: this.spec.funcArgsToScVals("get_campaign", {campaign_id}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getCampaign'],
        });
    }


        /**
    * Construct and simulate a donate_to_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    donateToCampaign = async ({id, donor_address, amount, token_id}: {id: u32, donor_address: string, amount: i128, token_id: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'donate_to_campaign',
            args: this.spec.funcArgsToScVals("donate_to_campaign", {id, donor_address: new Address(donor_address), amount, token_id: new Address(token_id)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['donateToCampaign'],
        });
    }


        /**
    * Construct and simulate a get_donators transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getDonators = async ({id}: {id: u32}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_donators',
            args: this.spec.funcArgsToScVals("get_donators", {id}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getDonators'],
        });
    }


        /**
    * Construct and simulate a get_dev_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getDevAcc = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_dev_acc',
            args: this.spec.funcArgsToScVals("get_dev_acc", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getDevAcc'],
        });
    }


        /**
    * Construct and simulate a get_launchpad_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getLaunchpadAcc = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_launchpad_acc',
            args: this.spec.funcArgsToScVals("get_launchpad_acc", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getLaunchpadAcc'],
        });
    }


        /**
    * Construct and simulate a get_arty_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getArtyToken = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_arty_token',
            args: this.spec.funcArgsToScVals("get_arty_token", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getArtyToken'],
        });
    }


        /**
    * Construct and simulate a get_token_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    getTokenAdmin = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_token_admin',
            args: this.spec.funcArgsToScVals("get_token_admin", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getTokenAdmin'],
        });
    }

}