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

  import Router from "svelte-spa-router";

  // Import the pages
  import Home from "./pages/Home.svelte";
  import Cleantechies from "./pages/Cleantechies.svelte";

  // Define the routes
  const routes = {
    "/": Home,
    "/cleantechies": Cleantechies,
  };
</script>

<main>
  <Router {routes} />
</main>
