<script>
    export let data;
    import {onMount} from "svelte";
    import ResultsPage from "$lib/sleepapp/shared/results_page.svelte";
    let arithmetic_ability;
    let simple_attention;
    let episodic_memory;
    let working_memory;
    let stats;
    
    onMount(async() => {
        arithmetic_ability = (await import("../../../lib/sleepapp/tests/arithmetic_ability.svelte")).default;
        simple_attention = (await import("../../../lib/sleepapp/tests/simple_attention.svelte")).default;
        episodic_memory = (await import("../../../lib/sleepapp/tests/episodic_memory.svelte")).default;
        working_memory = (await import("../../../lib/sleepapp/tests/working_memory.svelte")).default;
        await fetch("/cookies?"+data.params.test_name, {method:"GET"})
        .then(response => response.json())
        .then(d => stats = d.body);
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
{#if !data.completed_tests.includes("arithmetic_ability") && data.params.test_name == "arithmetic_ability"}
<svelte:component this={arithmetic_ability} on:complete={handleComplete}/>
{:else if !data.completed_tests.includes("simple_attention") && data.params.test_name == "simple_attention"}
<svelte:component this={simple_attention} on:complete={handleComplete}/>
{:else if !data.completed_tests.includes("episodic_memory") && data.params.test_name == "episodic_memory"}
<svelte:component this={episodic_memory} on:complete={handleComplete}/>
{:else if !data.completed_tests.includes("working_memory") && data.params.test_name == "working_memory"}
<svelte:component this={working_memory} on:complete={handleComplete}/>
{:else}
<div>
    <h2>{data.params.test_name} test results</h2>
</div>

<ResultsPage {stats}/>
{/if}
