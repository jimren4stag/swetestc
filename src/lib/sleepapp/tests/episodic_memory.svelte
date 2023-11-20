<script>
  import {createEventDispatcher} from "svelte";
  import {onMount} from "svelte";
  import {goto} from "$app/navigation";
  import Button from "../shared/button.svelte";
  import {onDestroy} from "svelte";
  import fixationCross from "$lib/sleepapp/img/fixation-cross.png";

  const dispatch = createEventDispatcher();
  const max_time_seconds = 12;
  const fixation_cross_time_seconds = 5;
  let current_stage = "";
  let words = [];
  let shown_words = [];
  let elapsed_time_100ms = 0;
  let startTime = new Date().getTime();
  onMount(() => {
    getWords();
    console.log("mount");
  });
  let response_array;
  async function getWords () {

     words = await fetch("/wordlist", {method:"GET"})
     .then(response => response.json())
     .then(data => words=data);
     let temp = words.slice();
     while (shown_words.length < 12) {
      shown_words.push(temp.splice(Math.floor(Math.random()*(temp.length-1)), 1)[0]);
     }

    response_array = Array(words.length).fill(-1); //starts with null, should probably start with -1 so handlesubmit will be simpler
  }

    let intervalId = setInterval(
    () => {
      switch(current_stage) {
        case "memorization":

         elapsed_time_100ms++;
         if (elapsed_time_100ms > 10 * max_time_seconds) current_stage = "fixation";
         console.log("mem");
         break;
        case "fixation":
         elapsed_time_100ms++;
          console.log("fix");
         if (elapsed_time_100ms > 10 * (max_time_seconds + fixation_cross_time_seconds)) {
          current_stage = "response";
          clearInterval(intervalId);
         };
          break;
        default:
          if(shown_words.length > 0) current_stage = "memorization";
          console.log("def");
          break;
      }
    },

    100
  );
  let is_valid_response = true;
  const handleSubmit = (e) => {
    let correct_answers = 0;
    let incorrect_answers = 0;
    for(let i = 0; i < response_array.length; i++) {
      if (response_array[i] === -1) {
        is_valid_response = false;
        return;
      }
      else 
        shown_words.includes(words[i]) == response_array[i]? correct_answers++ : incorrect_answers++;
    }
    dispatch("complete", {
      correct_answers,
      incorrect_answers,
    });

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
  <div class="timer">
    {#if current_stage == "memorization"}
    <h3>{(max_time_seconds-elapsed_time_100ms / 10).toFixed(1)}s</h3>
    {/if}
  </div>
</div>

{#if current_stage == "memorization"}
  <div class = "word-list-container">
  <ul class="word-list">
    {#each shown_words as word}
      <li>{word}</li>
    {/each}
  </ul>
</div>
{:else if current_stage == "response"}
<form on:submit|preventDefault={handleSubmit}>
<div class = "word-list-container">
  <ul class="word-list">
    <li class="column-title">
      <div></div>
      <div>Present</div>
      <div>Not present</div>
    </li>
    {#each words as word, i}
      <li>
          <label class="word-list-input-container">
            <div class="word-list-text-container">
              {word}
            </div>
            <input class="word-input" type="radio" bind:group ={response_array[i]} value={true}/>
            <input class="word-input" type="radio" bind:group ={response_array[i]} value={false}/>
          </label>
      </li>
    {/each}
  </ul>
</div>

<div class="submit-button">
  <Button type="submit">Submit</Button>
  {#if is_valid_response == false}
    <div>Please fill all fields</div>
  {/if}
</div>
</form>
{:else if current_stage == "fixation"}
  <div class="cross">
   <img src ={fixationCross} alt = "fixation cross"/>
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
  .word-list-container {
    display:flex;
    justify-content:center;
  }
  .word-list {
    list-style:none;
    padding:0;
    margin: 0;
  }
  .word-list-text-container {
    width:550px;
  }
  .word-list-input-container {
    display:flex;
  }
  .word-input{
    width:150%;
  }
  .column-title{
    display:flex;
    font-weight: bold;
    justify-content: space-between;
  }
  .submit-button{
    display:flex;
    justify-content:center;
  }
</style>

