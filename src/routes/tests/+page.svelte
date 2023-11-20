<script>
import TestCard from "$lib/sleepapp/shared/test_card.svelte";
//make a card like thing with completed/incopmlete
//refer user to login when tests finished
//
export let data;
let completed_tests = data.completed_tests != null? JSON.parse(data.completed_tests) : [];
let all_complete = true;

const tests = [
    {name: "arithmetic_ability", title: "Arithmetic"},
    {name: "simple_attention", title:"Reaction Time"},
    {name: "episodic_memory", title: "Episodic memory"},
   // {name: "stroop", title: "Stroop"},
    {name: "working_memory", title: "Working Memory"},
    {name: "subjective_rating", title: "Subjective Rating"}
]
console.log(tests);
for(let test of tests) {
    console.log(test);
    if(!completed_tests.includes(test.name) && test.name != "subjective_rating") { //fix
        all_complete = false;
        break;
    }
}
</script>

<div class="card-container">
{#each tests as test}
    <TestCard {all_complete} name = {test.name} link={"tests/"+test.name} is_complete = {completed_tests.includes(test.name)}> {test.title} </TestCard>
{/each}
</div>
<style>
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap:wrap
}
</style>