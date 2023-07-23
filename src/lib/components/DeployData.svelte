<script lang='ts'>
    import { onMount } from 'svelte'
    import * as Name from 'w3name';
    import { ethers } from 'ethers';

    
    import { type CIDString, type Web3File, type Web3Response, Web3Storage } from 'web3.storage'
    import { API_KEY, writeSigningKey, loadSigningKey, currentNamePointer } from "$lib/stores/state";
    
    
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
    import { browser } from '$app/environment';


    onMount(() => {
        async function callView() {
            if (browser) {
                const address = localStorage.getItem('contractAddress')
                if (address) {
                    const provider = new ethers.providers.Web3Provider(window['ethereum'])
                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(address, MetaDeployerABI, signer)

                    const name = await contract.readData(1)
                    currentNamePointer.set(name)
                    console.log(name)
                }


            }
        } callView()
    })


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


        const contract = await deployContract('k51qzi5uqu5diwdnuypmz6z6ymzr6w3u4b0wtyujjogx9bz23z983ct86y985w', 1)
        return name;

    }

    async function deployContract(name, num) {
        const provider = new ethers.providers.Web3Provider(window['ethereum'])
        const signer = provider.getSigner()
        const deploying = new ethers.ContractFactory(MetaDeployerABI, MetaDeployerBytecode, signer)
        const deployingContract = await deploying.deploy(name, num) // deploys contract 
        const contractAddress = deployingContract
        console.log(contractAddress.address)
        localStorage.setItem('contractAddress', contractAddress.address)
    }
    async function readCID() {
        const name = Name.parse($currentNamePointer)
    
        const revision = await Name.resolve(name);
        console.log(`Resolved value:`, revision.value);
    }

</script>

<main>
    {#if $currentNamePointer}
        <div class='text-3xl'>{$currentNamePointer}</div>
    {/if}
    <button on:click={(e)=>deployData(testObject)} 
    class='p-3 rounded-xl text-xl bg-indigo-600
    text-white font-semibold hover:scale-[1.05] 
    transition transition-200'>Deploy Data</button>

    
    <button on:click={readCID} 
        class='p-3 rounded-xl text-xl bg-indigo-600
        text-white font-semibold hover:scale-[1.05] 
        transition transition-200'>Read CID from pointer</button>
</main>