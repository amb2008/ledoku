<script>
  import {
    answer,
    starting_letters_ind,
    all_words,
    left_words,
    middle_words,
    right_words,
    widths,
    top_words,
    vert_middle_words,
    bottom_words,
  } from "./boards.js";

  // Import the pages
  import Home from "./pages/Home.svelte";
  import Cleantechies from "./pages/Cleantechies.svelte";

  let url = window.location.href;
</script>

{#if url.includes("cleantechies")}
  <Cleantechies />
{:else}
  <Home />
{/if}
