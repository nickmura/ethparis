import * as Name from 'w3name';
import { type CIDString, type Web3File, type Web3Response, Web3Storage } from 'web3.storage'
import { API_KEY } from "$lib/stores/state";


import {
    getAccessToken,
    getClientInstance,
    makeFileObjects,
    storeFiles,
    retrieveFiles,
    getData
} from "./ipfs";

export async function testIPNS() {
    console.log('creating IPNS name..')
    const name = await Name.create();
    console.log('created name:', name.toString())
    const cid = 'bafkreifwm2ekmu53jv3zdavwryvmxfcmetbrh2klmwsgalejwe6axqh3e4'
    const value = `/ipfs/${cid}`
    // initialize IPNS name value
    const revision = await Name.v0(name, value)
    const publish = await Name.publish(revision, name.key)
    console.log('initialized value on ipns', publish)

    const cid2 = `bafybeia3j4e4ucm6xnur3yiwyixscmn3jyh6m7hlavl7a227kca2exiqzu`
    const nextValue = `/ipfs/${cid2}`

    const nextRevision = await Name.increment(revision, nextValue)
    const publishRevision = await Name.publish(nextRevision, name.key)
    console.log('updated value on ipns')
}

export async function currentNameValue() {
    const nameID = `
    k51qzi5uqu5dhk948v9h51m33k0785eo3y8qixxa0px063o0aav3aeha27pmac
    bafybeia3j4e4ucm6xnur3yiwyixscmn3jyh6m7hlavl7a227kca2exiqzu
    `
    const name = Name.parse(nameID)
    
    const revision = await Name.resolve(name);
    console.log(`Resolved value:`, revision.value);
}

export async function deployData(obj) {
    
}