<script>
  import Button from "../shared/button.svelte";
  import {createEventDispatcher} from "svelte";
    import {goto} from "$app/navigation";

  import {onDestroy} from "svelte";
  const dispatch = createEventDispatcher();
  let sleepy_scale = 0;
  let sleep_time;
  let wake_time;

  let handleSubmit = () => {
    console.log(sleepy_scale);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h3>How sleepy are you right now?</h3>
  <div class="radio-container">
    <p>Extremely Awake</p>
    {#each Array(9) as _, i}
      <label class="radio-label">
        <input
          class="radio-input"
          type="radio"
          bind:group={sleepy_scale}
          name="test"
          value={i + 1}
        />
        {i + 1}
      </label>
    {/each}

    <p>Extremely Sleepy</p>
  </div>
  <div class="sleep-hours">
    <h3>What time did you sleep?</h3>
    <input type ="time" class="time-input" bind:value={sleep_time}/>
    <h3>What time did you wake up?</h3>
    <input type="time" class="time-input" bind:value ={wake_time}/>
  </div>
  <div class="button-container">
    <Button type="submit">Submit</Button>
  </div>
</form>

<style>
  h3 {
    display: flex;
    justify-content: center;
  }

  .radio-container {
    margin-top: 4px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .radio-input {
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid #000;
    border-radius: 50%;
    outline: none;
    margin: 0px 8px;
    position: relative;
    cursor: pointer;
  }
  .radio-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8px;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  .time-input{
    display:block;
    margin: 0 auto;
  }
</style>
