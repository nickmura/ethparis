<script lang='ts'>
    import { 
        getAccessToken, 
        getClientInstance, 
        makeFileObjects, 
        storeFiles, 
        retrieveFiles, 
        getData 
    } from "./ipfs";

    async function testIPFS() {
       const token = getAccessToken()
       console.log('Received access token, now awaiting client instance')
       const client = await getClientInstance(token)
       console.log('Received client instance, now storing files')

       const object = {
        test: 'hello',
        number: 12345
       }

       const files = makeFileObjects(object)
       const cid = await storeFiles(files)
       
       console.log('Now retrieving file directory...')

       const retrieve = await retrieveFiles(cid)
       const data = await getData(cid)
    }
</script>

<button class='p-3 rounded-xl text-xl bg-indigo-600 text-white font-semibold hover:scale-[1.05] transition transition-200' on:click={testIPFS}>Test IPFS</button>