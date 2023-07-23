<script lang='ts'>
    import { getData, testIPFS } from './ipfs'

</script>

<button on:click={testIPFS} 
class='p-3 rounded-xl text-xl bg-indigo-600
text-white font-semibold hover:scale-[1.05] 
transition transition-200' >Test IPFS</button>



<button on:click={(e)=>getData('bafybeia3j4e4ucm6xnur3yiwyixscmn3jyh6m7hlavl7a227kca2exiqzu')} 
class='p-3 rounded-xl text-xl bg-indigo-600
text-white font-semibold hover:scale-[1.05] 
transition transition-200' >get Data</button>