<script>
  export let type = "submit";
  
</script>

<button class={type} on:click on:mousedown>
  {#if type == "locked"}
  🔒
  {/if}
  <slot />
</button>

<style>
  button {
    border: 0;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 12px;
    font-weight: bold;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin: 8px 8px;
  }
  .submit {
    background: green;
    color: white;
  }
  .cancel {
    background: red;
    color: white;
  }
  .math-number {
    width: 100px;
    height: 100px;
    font-size: 200%;
    margin: 4px 4px;
  }
  .reaction-test {
    width: 100%;
    height: 400px;
  }
  .reaction-test-waiting {
    background: red;
    color: white;
  }
  .reaction-test-active {
    background: green;
    color: white;
  }
  .locked {
    cursor:not-allowed;
    background: #ccc;
    color: #888;
  }
</style>
