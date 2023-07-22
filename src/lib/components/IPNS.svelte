<script>
    import { testIPNS, currentNameValue } from "./ipns";

</script>


<button on:click={testIPNS} 
class='p-3 rounded-xl text-xl bg-indigo-600 text-white 
font-semibold hover:scale-[1.05] 
transition transition-200'>Test IPNS</button>

<button on:click={currentNameValue} class='p-3 rounded-xl text-xl bg-indigo-600 text-white 
font-semibold hover:scale-[1.05] 
transition transition-200'>current name value</button>