<script>
    export let data;
    import {onMount} from "svelte";
    import ResultsPage from "$lib/sleepapp/shared/results_page.svelte";
    let Test;
    let stats;
    
    onMount(async() => {
        console.log("jimstats");
        Test = (await import("../../../lib/sleepapp/tests/"+data.params.test_name + ".svelte")).default;
        console.log("jimstats0");
        await fetch("/cookies?"+data.params.test_name, {method:"GET"})
        .then(response => response.json())
        .then(d => stats = d.body);
        console.log(stats);
        console.log("jimstats2");
    });

    const handleComplete = (e) => {

        fetch("/cookies", {
            method: "POST",
            body: JSON.stringify({name: "completed_tests", value: data.params.test_name}),
        })
        .then(response => location.reload())
        .catch((error) => {
            console.error(error);
        });
                
        fetch("/cookies", {
            method: "POST",
            body: JSON.stringify({name: data.params.test_name, value: e.detail}),
        })
        .then(response => location.reload())
        .catch((error) => {
            console.error(error);
        });
    }

</script>
{#if data.completed_tests.includes(data.params.test_name)}
<svelte:component this={Test} on:complete={handleComplete}/>
{:else}
<div>
    <h2>{data.params.test_name} test results</h2>
</div>

<ResultsPage {stats}/>
{/if}
