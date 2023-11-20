<script>
    export let is_complete = false;
    export let all_complete = false;
    export let link = "";
    export let name = "";
    import Button from "$lib/sleepapp/shared/button.svelte";
</script>

<div class={"card " + (is_complete? "complete" : "incomplete")}>
    <slot/>
    <p>{is_complete? "Completed": "Not yet completed"}</p>
    <p>
        {#if is_complete}
            <a href={link}>
            <Button type = "submit">View Results</Button>
            </a>
        {:else if name == "subjective_rating" && !all_complete}
                <Button type = "locked">Complete Last</Button>
        {:else}

            <a href={link}>
            <Button type = "submit">Begin Test</Button>
            </a>
        {/if}
</div> 

<style>
.card {
  background-color: white;
  border-radius: 8px;
  margin: 20px auto;

  padding: 15px 15%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}
.complete{
}
.incomplete{
}
</style>
