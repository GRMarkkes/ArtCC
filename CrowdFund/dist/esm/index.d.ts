import { ContractSpec } from '@stellar/stellar-sdk';
import { AssembledTransaction, Ok, Err } from './assembled-tx.js';
import type { u32, u64, i128, Error_ } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly unknown: {
        readonly networkPassphrase: "Public Global Stellar Network ; September 2015";
        readonly contractId: "CBYMFAAA3OIFXXBHH7C2JKXDCNB547VGZSURPUPFDDSF2MBNYKJUZXMB";
    };
};
/**
    
    */
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
    8: {
        message: string;
    };
};
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
export type DataKey = {
    tag: "DevAccount";
    values: void;
} | {
    tag: "LaunchpadAccount";
    values: void;
} | {
    tag: "ArtyToken";
    values: void;
} | {
    tag: "TokenAdmin";
    values: void;
};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<void>;
        createCampaign: (json: string) => AssembledTransaction<Err<Error_> | Ok<Campaign, Error_>>;
        getCampaigns: (json: string) => AssembledTransaction<Campaign[]>;
        getCampaign: (json: string) => AssembledTransaction<Campaign>;
        donateToCampaign: (json: string) => AssembledTransaction<Err<Error_> | Ok<readonly [bigint, bigint, bigint], Error_>>;
        getDonators: (json: string) => AssembledTransaction<Err<Error_> | Ok<string[], Error_>>;
        getDevAcc: (json: string) => AssembledTransaction<string>;
        getLaunchpadAcc: (json: string) => AssembledTransaction<string>;
        getArtyToken: (json: string) => AssembledTransaction<string>;
        getTokenAdmin: (json: string) => AssembledTransaction<string>;
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize: ({ dev_acc, launchpad_acc, arty_token, token_admin }: {
        dev_acc: string;
        launchpad_acc: string;
        arty_token: string;
        token_admin: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createCampaign: ({ owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, metadata_cmp, image_cmp, target_cmp, deadline_cmp }: {
        owner_addr: string;
        title_cmp: string;
        desc_cmp: string;
        category_cmp: string;
        main_location_cmp: string;
        metadata_cmp: string;
        image_cmp: string;
        target_cmp: i128;
        deadline_cmp: u64;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Err<Error_> | Ok<Campaign, Error_>>>;
    /**
* Construct and simulate a get_campaigns transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getCampaigns: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Campaign[]>>;
    /**
* Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getCampaign: ({ campaign_id }: {
        campaign_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Campaign>>;
    /**
* Construct and simulate a donate_to_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    donateToCampaign: ({ id, donor_address, amount, token_id }: {
        id: u32;
        donor_address: string;
        amount: i128;
        token_id: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Err<Error_> | Ok<readonly [bigint, bigint, bigint], Error_>>>;
    /**
* Construct and simulate a get_donators transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getDonators: ({ id }: {
        id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<Err<Error_> | Ok<string[], Error_>>>;
    /**
* Construct and simulate a get_dev_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getDevAcc: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a get_launchpad_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getLaunchpadAcc: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a get_arty_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getArtyToken: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
    /**
* Construct and simulate a get_token_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getTokenAdmin: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string>>;
}
