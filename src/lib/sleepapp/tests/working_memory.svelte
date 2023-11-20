<script>
  import {createEventDispatcher} from "svelte";
  import Button from "../shared/button.svelte";
    import {goto} from "$app/navigation";
  import {onDestroy} from "svelte";
    import fixationCross from "$lib/sleepapp/img/fixation-cross.png";
  const dispatch = createEventDispatcher();
  const trials = 3;
  let completed_trials = 0;
  const sequence_length = 7;
  const max_time_seconds = 7;
  const fixation_cross_time_seconds = 1;
  let grid = [];
  let grid_sample = [];
  let grid_sequence = [];
  let is_included_in_sequence = false;
  let current_stage = "";
  let elapsed_time_s = 0;
  let mistakes = 0;
  for(let i = 0; i < 4; i++) {
    grid.push(Array(4).fill(false));
  }
  let sequence_number = 0;
  const intervalFunc = () => {
      switch(current_stage) {
        case "memorization":
         if (elapsed_time_s >= max_time_seconds){
             current_stage = "fixation";
             break;
         }
         if(elapsed_time_s >= sequence_number+1){
            grid[grid_sequence[sequence_number][0]][grid_sequence[sequence_number][1]] = false;
            sequence_number++;
            grid[grid_sequence[sequence_number][0]][grid_sequence[sequence_number][1]] = true;
         }
         elapsed_time_s++;
         break;
        case "fixation":
         elapsed_time_s++;
         if (elapsed_time_s > max_time_seconds + fixation_cross_time_seconds) {
          current_stage = "response";
          clearInterval(intervalId);
         };
          break;
        default:
          console.log("error");
          break;
      }
      console.log(current_stage);
      console.log(sequence_number);
  }

  let intervalId = null;
  const setup = () => {
    current_stage = "";
    elapsed_time_s = 0;
    sequence_number = 0;
    grid_sequence = [];
    grid_sample = [];
    grid = [];
    for(let i = 0; i < 4; i++) {
      grid.push(Array(4).fill(false));
      grid_sample.push(Array(4).fill(""));
    }
    for(let i = 0; i < sequence_length; i++) {
      grid_sequence.push([Math.floor(Math.random()*4), Math.floor(Math.random()*4)]);
    }

    let index = Math.floor(Math.random()*sequence_length);
    if(Math.floor(Math.random()*2)) {
      grid_sample[grid_sequence[index][0]][grid_sequence[index][1]] = index+1;
      is_included_in_sequence = true;
    }
    else {
      let coords = Math.floor(Math.random()*2)? [Math.floor(Math.random()*4),Math.floor(Math.random()*4)] : grid_sequence[index];
      while(grid_sample.includes(coords) && grid_sample.indexOf(coords) == grid_sample[index]) {
        coords = Math.floor(Math.random()*2)? [Math.floor(Math.random()*4),Math.floor(Math.random()*4)] : grid_sequence[index];
      }
      grid_sample[coords[0]][coords[1]] = Math.floor(Math.random()*sequence_length)+1;
      is_included_in_sequence = false;

    }
    grid[grid_sequence[0][0]][grid_sequence[0][1]] = true;
    current_stage="memorization";
    console.log("Set");
    intervalFunc();
    intervalId = setInterval(intervalFunc,1000);

  }
  setup();
  const handleResponse = (input) => {
    if(input != is_included_in_sequence) mistakes++;
    completed_trials++;
    if(completed_trials >= trials) {
      dispatch(
        "complete", {
          trials,
          mistakes,
        },
      )
    };
    setup();
  }
  const cancelTest = () => {
    goto("/tests");
  };
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<div class="header">
  <div class="cancel">
   <Button type="cancel" on:click={cancelTest}>Cancel</Button>
  </div>
  <div>
    <h3>{completed_trials}/{trials}</h3>
  </div>
</div>
{#if current_stage == "memorization"}
<div class="grid-container">
<div class="grid">
  {#each grid as row, i}
    {#each row as square, j}
      <div class={square? "grid-item active pulse" : "grid-item"}></div>
    {/each}
  {/each}
</div>
</div>
{:else if current_stage == "fixation"}
  <div class="cross">
    <img src={fixationCross} alt = "fixation cross"/>
  </div>
{:else if current_stage == "response"}
 <div class="grid-container">
<div class="grid">
  {#each grid_sample as row, i}
    {#each row as square, j}
      <div class={square? "grid-item active" : "grid-item"}>{square}</div>
    {/each}
  {/each}
</div>
</div> 
<div class="response-buttons">
<Button on:click={() => handleResponse(true)} type="submit">Yes</Button> 
<Button on:click={() => handleResponse(false)} type="cancel">No</Button>
</div>
{/if}
<style>
  .cross {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .cross img {
    width:100%;
    height:100%;
  }
    .header {
    display: flex;
    justify-content: space-between;
  }
.grid-container {
  display:flex;
  justify-content: center;
}
.grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.grid-item {
  font-size:larger;
  color:aliceblue;
  background-color:aliceblue;
  padding: 50px 50px;
  position:relative;
}
@keyframes pulse {
  0% {
    background-color: purple;
  }
  50% {
    background-color: red;
  }
  100% {
    background-color: red;
  }
}
.active {
  background-color: red;
}
.pulse {

  transition: background-color 0.5s;
  animation: pulse 1s infinite;
}

.response-buttons {
  display:flex;
  align-items: center;
  margin-top: 10%;
  justify-content: space-evenly;
  
}
</style>