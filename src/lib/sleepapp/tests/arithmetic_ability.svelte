<script>
  import Button from "../shared/button.svelte";
  import {createEventDispatcher} from "svelte";
    import {goto} from "$app/navigation";
  import {onDestroy} from "svelte";
  const dispatch = createEventDispatcher();
  
  const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };
  const max_time_seconds = 1;
  let elapsed_time_100ms = 0;

  const start_time = new Date().getTime();

  let completed_questions = 0;
  let correct_answers = 0;

  let first_number = getRandomNumber(10, 99);
  let second_number = getRandomNumber(10, 99);
  let answer = first_number + second_number;
  let user_input = "";

  let intervalId = setInterval(
    () => {
      elapsed_time_100ms++;
      if (elapsed_time_100ms > 10 * max_time_seconds) endTest();
    },

    100
  );

  const handleSubmit = () => {
    if (parseInt(user_input) == answer) correct_answers++;
    first_number = getRandomNumber(10, 99);
    second_number = getRandomNumber(10, 99);
    answer = first_number + second_number;
    user_input = "";
    completed_questions++;
  };

  const endTest = () => {
    const end_time = new Date().getTime();
    console.log(correct_answers);
    console.log(completed_questions);
    clearInterval(intervalId);
    if(end_time-start_time > 1000*(max_time_seconds + 1)) {
      console.log("error, maximum time exceeded");
      goto("/tests");
    }
    else
    dispatch("complete", {
      correct_answers,
      completed_questions,
    });
  };
  const cancelTest = () => {
    goto("/tests");
  };
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<div class="cancel">
  <Button type="cancel" on:click={cancelTest}>Cancel</Button>
</div>

<div class="header">
  <div class="counter">
    <h3>{completed_questions + 1} )</h3>
  </div>
  <div class="timer">
    <h3>{(max_time_seconds- elapsed_time_100ms / 10).toFixed(1)}s</h3>
  </div>
</div>

<div class="question">
  <h1>{first_number} + {second_number} = ___</h1>
</div>

<div class="user-input">
  {#if user_input.length === 0}
    <h1>__</h1>
  {:else}
    <h1>{user_input}</h1>
  {/if}
</div>

<div class="numpad">
  {#each Array(3) as _, i}
    {#each Array(3) as _, j}
      <Button
        type="math-number"
        on:click={() => {
          user_input += 3 * i + j + 1;
        }}
      >
        {3 * i + j + 1}
      </Button>
    {/each}
    <br />
  {/each}
  <Button type="math-number submit" on:click={handleSubmit}>OK</Button>
  <Button
    type="math-number"
    on:click={() => {
      user_input += "0";
    }}>0</Button
  >
  <Button
    type="math-number cancel"
    on:click={() => {
      user_input = user_input.slice(0, -1);
    }}>←</Button
  >
</div>

<style>
  .question {
    display: flex;
    justify-content: center;
  }
  .user-input {
    display: flex;
    justify-content: center;
  }
  .numpad {
    justify-content: center;
    text-align: center;
  }
  .counter {
    margin-left: 2%;
    margin-right: auto;
  }
  .timer {
    margin-right: 2%;
    margin-left: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
