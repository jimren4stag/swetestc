<script>
  import {createEventDispatcher} from "svelte";
    import {goto} from "$app/navigation";
  const dispatch = createEventDispatcher();
  import Button from "../shared/button.svelte";

  import {onDestroy} from "svelte";
  const minimum_time = 2;
  const maximum_time = 5;
  const maximum_run = 1;
  let run_count = 0;
  let start_time = 0;
  let end_time = 0;

  let button_state = "reaction-test-init";
  let button_message = "Tap to begin test";
  let times_array = [];

  const getTime = () => {
    return Math.random() * (maximum_time - minimum_time) + minimum_time;
  };

  const handleClick = () => {
    switch (button_state) {
      case "reaction-test-waiting":
        failure();
        break;
      case "reaction-test-active":
        success();
        break;
      default:
        activate();
        break;
    }
  };
  let timeout_id = 0;
  const activate = () => {
    button_state = "reaction-test-waiting";
    button_message = "Wait for green...";
    let time = getTime();
    timeout_id = setTimeout(() => {
      button_state = "reaction-test-active";
      button_message = "Tap now!";
      start_time = new Date().getTime();
    }, time * 1000);
  };
  const failure = () => {
    button_state = "reaction-test-failure";
    button_message = "Too early, tap to try again";
    clearTimeout(timeout_id);
  };
  const success = () => {
    button_state = "reaction-test-success";
    end_time = new Date().getTime();
    run_count++;
    
    times_array.push(end_time - start_time);
    button_message = "Tap to continue (" + (end_time - start_time) + "ms)";

    if (run_count >= maximum_run) {
      dispatch("complete", {
        times_array,
      })
      return;
    }
  };

  const cancelTest = () => {
    clearTimeout(timeout_id);
    goto("/tests");
  };
</script>

<div class="header">
  <div class="cancel">
    <Button type="cancel" on:click={cancelTest}>Cancel</Button>
  </div>
  <div class="trial-number">
    <h3>{run_count}/{maximum_run} Completed</h3>
  </div>
</div>

<div class="reaction-test">
  <Button type={"reaction-test " + button_state} on:mousedown={handleClick}
    >{button_message}</Button
  >
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .trial-number {
    margin-right: 2%;
    margin-left: auto;
  }
</style>
