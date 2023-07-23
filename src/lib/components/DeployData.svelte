<script lang='ts'>
    import * as Name from 'w3name';
    import { ethers } from 'ethers';

    
    import { type CIDString, type Web3File, type Web3Response, Web3Storage } from 'web3.storage'
    import { API_KEY, writeSigningKey, loadSigningKey } from "$lib/stores/state";

    
    import {
        getAccessToken,
        getClientInstance,
        makeFileObjects,
        storeFiles,
        retrieveFiles,
        getData
    } from "./test/ipfs";


    import MetaDeployerABI from '$lib/abis/MetaDeployerABI.json'
    import { MetaDeployerBytecode } from '$lib/abis/MetaDeployerBytecode';

    const testObject = {
        name: 'Nick Mura',
        level: 100,
        age: 19,
        country: 'Canada',
        followers: 69,
        

    }

    async function storingData(obj) {
        const token = getAccessToken()
        console.log('Received access token, now awaiting client instance')
        const client = getClientInstance(token)
        console.log('Received client instance, now storing files')

        const files = makeFileObjects(obj)
        const cid = await storeFiles(files)
        console.log(`Sucessfully stored data on IPFS with cid ${cid},
        now creating name`)
        return cid
    }

    async function publishData(cid) {
        const name = await Name.create();
        const value = `/ipfs/${cid}`
        const revision = await Name.v0(name, value)
        const publish = await Name.publish(revision, name.key)
        // writeSigningKey(name)
        console.log(`Successfully stored mutable pointer to stored data: ${name.toString()}`, )
        return name
    }
    async function deployData(obj) {
        console.log('Storing data on IPFS...')
        const cid = await storingData(obj)
        const name = await publishData(cid) // mutable pointer
        // now deploy contract


        const pK = `enter private key here`
        
        return name;

    }

    async function deployContract(name, num) {
        const provider = new ethers.providers.Web3Provider(window['ethereum'])
        const signer = provider.getSigner()
        const deploying = new ethers.ContractFactory(MetaDeployerABI, MetaDeployerBytecode, signer)
        const deployingWallet = await walletContractFactory.deploy(name, num) // deploys contract 

    }
    async function test() {
        const metadata = '0x6ccf563fbd25884e574612506643f5bc35cb8806e9479df09f6e94559ba58593'
        const _metadata = ethers.utils.hexStripZeros(metadata)
        console.log(ethers.utils.parseBytes32String(_metadata))
    }

</script>

<main>
    <button on:click={(e)=>deployData(testObject)} 
    class='p-3 rounded-xl text-xl bg-indigo-600
    text-white font-semibold hover:scale-[1.05] 
    transition transition-200'>Deploy Data</button>

    
    <button on:click={test} class=''>test</button>
</main>