<script lang='ts'>
    import { 
        getAccessToken, 
        getClientInstance, 
        makeFileObjects, 
        storeFiles, 
        retrieveFiles, 
        getData,
        testIPFS
    } from "./ipfs";


</script>

<button on:click={testIPFS} class='p-3 rounded-xl text-xl bg-indigo-600 text-white font-semibold hover:scale-[1.05] transition transition-200' >Test IPFS</button>