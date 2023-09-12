import { Contract } from 'soroban-client'

/**
 * The Soroban contract ID for the CrowdFund contract.
 */
export const CONTRACT_ID = 'CCWC2ZLNMM25PYW6GWXCWDH52OAUHGBQV3NTWG42CJK3OH2ZUXTE37NG'

/**
 * The Soroban contract ID for the CrowdFund contract, in hex.
 * If {@link CONTRACT_ID} is a new-style `C…` string, you will need this hex
 * version when making calls to RPC for now.
 */
export const CONTRACT_ID_HEX = new Contract(CONTRACT_ID).contractId('hex')


/**
 * The Soroban network passphrase used to initialize this library.
 */
export const NETWORK_PASSPHRASE = 'Test SDF Future Network ; October 2022'

/**
 * The Soroban RPC endpoint used to initialize this library.
 */
export const RPC_URL = 'https://rpc-futurenet.stellar.org:443'

