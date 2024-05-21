import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
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
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  unknown: {
    networkPassphrase: "Public Global Stellar Network ; September 2015",
    contractId: "CDM2A3BAYAJK23FFJQRYLLTY5QS77YNZDTECL67RCSSK56SR4DQHEIW7",
  }
} as const

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

export interface Campaign {
  amount_collected: i128;
  category: string;
  deadline: u64;
  description: string;
  donations: Array<i128>;
  donators: Array<string>;
  id: u32;
  image: string;
  main_location: string;
  metadata: string;
  owner: string;
  status: boolean;
  target: i128;
  title: string;
}

export type DataKey = {tag: "DevAccount", values: void} | {tag: "LaunchpadAccount", values: void} | {tag: "Admin", values: void};


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({dev_acc, launchpad_acc, admin}: {dev_acc: string, launchpad_acc: string, admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_campaign: ({owner_addr, title_cmp, desc_cmp, category_cmp, main_location_cmp, metadata_cmp, image_cmp, target_cmp, deadline_cmp}: {owner_addr: string, title_cmp: string, desc_cmp: string, category_cmp: string, main_location_cmp: string, metadata_cmp: string, image_cmp: string, target_cmp: i128, deadline_cmp: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Campaign>>>

  /**
   * Construct and simulate a get_campaigns transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaigns: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<Campaign>>>

  /**
   * Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaign: ({campaign_id}: {campaign_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Campaign>>

  /**
   * Construct and simulate a donate_to_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  donate_to_campaign: ({id, donor_address, amount, token_id}: {id: u32, donor_address: string, amount: i128, token_id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<readonly [i128, i128, i128]>>>

  /**
   * Construct and simulate a get_donators transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_donators: ({id}: {id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Array<string>>>>

  /**
   * Construct and simulate a get_dev_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_dev_acc: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_launchpad_acc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_launchpad_acc: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_admin: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACAAAAAAAAAAWRGVhZGxpbmVTaG91bGRCZUZ1dHVyZQAAAAAAAQAAAAAAAAAQQ2FtcGFpZ25Ob3RFeGlzdAAAAAIAAAAAAAAAEUFtb3VudE11c3ROb25aZXJvAAAAAAAAAwAAAAAAAAANVGFyZ2V0UmVhY2hlZAAAAAAAAAQAAAAAAAAAF0Ftb3VudEV4Y2VlZFRhcmdldExpbWl0AAAAAAUAAAAAAAAAFENhbXBhaWduQWxyZWFkeUV4aXN0AAAABgAAAAAAAAAVSWRDYW1wYWlnbk11c3ROb25aZXJvAAAAAAAABwAAAAAAAAAUTG93QW1vdW50Rm9yU3BsaXR0ZXIAAAAI",
        "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAADgAAAAAAAAAQYW1vdW50X2NvbGxlY3RlZAAAAAsAAAAAAAAACGNhdGVnb3J5AAAAEAAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAlkb25hdGlvbnMAAAAAAAPqAAAACwAAAAAAAAAIZG9uYXRvcnMAAAPqAAAAEwAAAAAAAAACaWQAAAAAAAQAAAAAAAAABWltYWdlAAAAAAAAEAAAAAAAAAANbWFpbl9sb2NhdGlvbgAAAAAAABAAAAAAAAAACG1ldGFkYXRhAAAAEAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAZzdGF0dXMAAAAAAAEAAAAAAAAABnRhcmdldAAAAAAACwAAAAAAAAAFdGl0bGUAAAAAAAAQ",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAACkRldkFjY291bnQAAAAAAAAAAAAAAAAAEExhdW5jaHBhZEFjY291bnQAAAAAAAAAAAAAAAVBZG1pbgAAAA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAHZGV2X2FjYwAAAAATAAAAAAAAAA1sYXVuY2hwYWRfYWNjAAAAAAAAEwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAkAAAAAAAAACm93bmVyX2FkZHIAAAAAABMAAAAAAAAACXRpdGxlX2NtcAAAAAAAABAAAAAAAAAACGRlc2NfY21wAAAAEAAAAAAAAAAMY2F0ZWdvcnlfY21wAAAAEAAAAAAAAAARbWFpbl9sb2NhdGlvbl9jbXAAAAAAAAAQAAAAAAAAAAxtZXRhZGF0YV9jbXAAAAAQAAAAAAAAAAlpbWFnZV9jbXAAAAAAAAAQAAAAAAAAAAp0YXJnZXRfY21wAAAAAAALAAAAAAAAAAxkZWFkbGluZV9jbXAAAAAGAAAAAQAAA+kAAAfQAAAACENhbXBhaWduAAAAAw==",
        "AAAAAAAAAAAAAAANZ2V0X2NhbXBhaWducwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIQ2FtcGFpZ24=",
        "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAEAAAfQAAAACENhbXBhaWdu",
        "AAAAAAAAAAAAAAASZG9uYXRlX3RvX2NhbXBhaWduAAAAAAAEAAAAAAAAAAJpZAAAAAAABAAAAAAAAAANZG9ub3JfYWRkcmVzcwAAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAIdG9rZW5faWQAAAATAAAAAQAAA+kAAAPtAAAAAwAAAAsAAAALAAAACwAAAAM=",
        "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0b3JzAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6QAAA+oAAAATAAAAAw==",
        "AAAAAAAAAAAAAAALZ2V0X2Rldl9hY2MAAAAAAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAARZ2V0X2xhdW5jaHBhZF9hY2MAAAAAAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAAT" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        create_campaign: this.txFromJSON<Result<Campaign>>,
        get_campaigns: this.txFromJSON<Array<Campaign>>,
        get_campaign: this.txFromJSON<Campaign>,
        donate_to_campaign: this.txFromJSON<Result<readonly [i128, i128, i128]>>,
        get_donators: this.txFromJSON<Result<Array<string>>>,
        get_dev_acc: this.txFromJSON<string>,
        get_launchpad_acc: this.txFromJSON<string>,
        get_admin: this.txFromJSON<string>
  }
}