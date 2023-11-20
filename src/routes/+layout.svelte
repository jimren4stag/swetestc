<script>
  import "$lib/sleepapp/global.css";
  import Header from "$lib/sleepapp/header.svelte";
  import Footer from "$lib/sleepapp/footer.svelte";
</script>

<Header></Header>
<slot />
<Footer></Footer>