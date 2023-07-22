import { API_KEY } from "$lib/stores/state";
import { type CIDString, type Web3File, type Web3Response, Web3Storage } from 'web3.storage'

import { 
    getAccessToken, 
    getClientInstance, 
    makeFileObjects, 
    storeFiles, 
    retrieveFiles, 
    getData 
} from "./ipfs";

