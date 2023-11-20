<script>
    import {onMount} from "svelte";
    export let stats = {};
    let keys = []; 

    $: {
        keys=[];
    Object.keys(stats).forEach(function (key) {
        keys.push(key);
    });
    }

</script>

<div>
    {#each keys as key}
        <div>{key}: {stats[key]}</div>
    {/each}
</div>