<!-- Use this link to create words https://word.tips/unscramble/ -->
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

  let screen_width = window.innerWidth;
  // let too_small = false;

  // if (screen_width < 750) {
  //   too_small = true;
  // }
  
  let wordbank = false;
  let var_answer = answer;

  let day = 3;
  let columns = 12;
  let rows = 7;
  let old_columns = columns;
  let old_rows = rows;

  let url_object = new URL(window.location.href);
  let url = url_object.href;
  let title = "Ledoku #" + day;

  if (url.includes("dalton")) {
    day = 2;
    title = "Dalton";
  } else if (url.includes("sandbox")) {
    day = 0;
    title = "Sandbox";
  } else if (url.includes("cleantechies195")){
    day = 4;
    title = "CleanTechies EP #195";
  } else if (url.includes("cleantechies196")){
    day = 5;
    title = "CleanTechies EP #196";
  } else if (url.includes("cleantechies")) {
    day = 3;
    title = "CleanTechies";
  }

if (day == 0){
    setTimeout(() => {
        const wordbank_input = document.getElementById("word-bank");
        wordbank_input.addEventListener('input', ()=>{wordbank=true, wordbank=wordbank});
    }, 1000);
  }

  let boxes = [];
  let words = all_words[day];
  let left_word = left_words[day];
  let middle_word = middle_words[day]; // words contains all but the last indices of each word
  let right_word = right_words[day];
  let top_word = top_words[day];
  let vert_middle_word = vert_middle_words[day];
  let bottom_word = bottom_words[day];

  let starting_letters = [];

  for (let i = 0; i < var_answer[day].length; i++) {
    if (starting_letters_ind[day].includes(i)) {
      starting_letters.push(var_answer[day][i]);
    } else {
      starting_letters.push("null");
    }
  }

  boxes = [];

  for (let i = 0; i < var_answer[day].length; i++) {
    boxes.push({ id: `box${i}`, value: "", show: true, background: "white" });
  }

  let letter_bank = [];

  function countLetters() {
    letter_bank = [];
    for (let i = 0; i < var_answer[day].length; i++) {
      let index = -1;
      index = letter_bank.findIndex((item) => item.letter === var_answer[day][i]);
      if (index != -1) {
        letter_bank[index].count += 1;
      } else {
        letter_bank.push({ letter: var_answer[day][i], count: 1 });
      }

      if (var_answer[day][i] === "null") {
        boxes[i].show = false;
      } else {
        boxes[i].show = true;
      }
    }

    for (let i = 0; i < starting_letters.length; i++) {
      if (starting_letters[i] !== "null") {
        boxes[i].value = starting_letters[i];
      }
    }
  }

  countLetters();

  let shuffle_indices = [];
  for (let i = letter_bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    shuffle_indices.push([i, j]);
  }

  // largest word you can think of where every time you remove a letter, it still forms a word
  function subtractLetters() {
    countLetters();
    for (let i = 0; i < boxes.length; i++) {
      let index = letter_bank.findIndex(
        (item) => item.letter === boxes[i].value
      );
      if (letter_bank[index]) {
        letter_bank[index].count -= 1;
      } else if (boxes[i].value !== "" && day != 0) {
        alert(
          "There are no more " + boxes[i].value + "s left in the letter bank."
        );
      }
    }

    // shuffle the letters but always shuffle by the same indices so its not disorienting
    for (let i = 0; i < shuffle_indices.length; i++) {
      let [j, k] = shuffle_indices[i];
      [letter_bank[j], letter_bank[k]] = [letter_bank[k], letter_bank[j]];
    }
  }

  subtractLetters();

  let correct = false;
  function checkvar_answer() {
    correct = true;
    let structure = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].value == "") {
        structure.push("null");
      } else {
        structure.push(boxes[i].value);
      }
      if (
        boxes[i].value !== var_answer[day][i] &&
        var_answer[day][i] !== "null" &&
        starting_letters[i] === "null"
      ) {
        correct = false;
      }
    }
    if (day === 0) {
      console.log(structure);
    }
  }

  let lastInput = 0;
  let direction = "right";

  document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && wordbank==false) {
      setTimeout(() => {
        if (direction === "right") {
          prevInput();
        } else {
          upInput();
        }
      }, 1);
    }

    if (event.key === "ArrowRight" && wordbank==false) {
      nextInput2();
    }

    if (event.key === "ArrowLeft" && wordbank==false) {
      prevInput();
    }

    if (event.key === "ArrowDown" && wordbank==false) {
      downInput();
    }

    if (event.key === "ArrowUp" && wordbank==false) {
      upInput();
    }

    if (event.key === "Enter" && wordbank==false) {
      clickDirectionSwap(`box${lastInput}`);
      document.getElementById(`box${lastInput}`).focus();
    }

    if (event.key === "Tab" && wordbank==false) {
      clickDirectionSwap(`box${lastInput}`);
      setTimeout(() => {
        document.getElementById(`box${lastInput}`).focus();
      }, 0.0001);
    }
  });

  function handleInput(id) {
    return (event) => {
      lastInput = boxes.findIndex((item) => item.id === id);
      const value = event.target.value;
      const index = boxes.findIndex((item) => item.id === id);
      boxes[index].value = value.toUpperCase().slice(-1);

      subtractLetters();
      checkvar_answer();
      if (boxes[index].value.length > 0) {
        nextInput();
      }
    };
  }

  function nextInput() {
    if (direction === "right") {
      let num = lastInput;
      let next_id = `box${lastInput + 1}`;
      lastInput += 1;

      let next_input = document.getElementById(next_id);
      let counter = 0;
      while (next_input == null || next_input.value != "") {
        counter += 1;
        lastInput += 1;
        num += 1;
        next_id = `box${num}`;
        next_input = document.getElementById(next_id);
        lastInput = num;
        if (num > var_answer[day].length) {
          num = 0;
        }
        if (counter > 100) {
          break;
        }
      }
      if (next_input) {
        next_input.focus();
      } else {
        lastInput = lastInput - 1;
      }
    } else {
      let num = lastInput;
      let next_id = `box${lastInput + widths[day]}`;
      lastInput += widths[day];

      let next_input = document.getElementById(next_id);
      let counter = 0;
      while (next_input == null || next_input.value != "") {
        counter += 1;
        lastInput += widths[day];
        num += widths[day];
        next_id = `box${num}`;
        next_input = document.getElementById(next_id);
        lastInput = num;
        if (num > var_answer[day].length) {
          num = num % widths[day];
        }
        if (counter > 100) {
          break;
        }
      }
      if (next_input) {
        next_input.focus();
      } else {
        lastInput = lastInput - widths[day];
      }
    }
  }

  function prevInput() {
    let num = lastInput;
    let next_id = `box${lastInput - 1}`;
    lastInput = lastInput - 1;

    let next_input = document.getElementById(next_id);
    let counter = 0;
    while (next_input == null) {
      counter += 1;
      num -= 1;
      next_id = `box${num}`;
      next_input = document.getElementById(next_id);
      lastInput = num;
      if (num < 0) {
        num = var_answer[day].length - 1;
      }
      if (counter > 100) {
        break;
      }
    }
    if (next_input) {
      next_input.focus();
    } else {
      lastInput = lastInput + 1;
    }
  }

  function nextInput2() {
    let num = lastInput;
    let next_id = `box${lastInput + 1}`;
    lastInput = lastInput + 1;

    let next_input = document.getElementById(next_id);
    let counter = 0;
    while (next_input == null) {
      counter += 1;
      num += 1;
      next_id = `box${num}`;
      next_input = document.getElementById(next_id);
      lastInput = num;
      if (num > var_answer[day].length) {
        num = 0;
      }
      if (counter > 100) {
        break;
      }
    }
    if (next_input) {
      next_input.focus();
    } else {
      lastInput -= 1;
    }
  }

  function downInput() {
    let num = lastInput;
    let next_id = `box${lastInput + widths[day]}`;
    lastInput = lastInput + widths[day];

    let next_input = document.getElementById(next_id);
    let counter = 0;
    while (next_input == null) {
      counter += 1;
      num += widths[day];
      next_id = `box${num}`;
      next_input = document.getElementById(next_id);
      lastInput = num;
      if (num > var_answer[day].length) {
        num = (num % widths[day]) - widths[day];
      }
      if (counter > 100) {
        break;
      }
    }
    if (next_input) {
      next_input.focus();
    } else {
      lastInput = lastInput - widths[day];
    }
  }

  function upInput() {
    let num = lastInput;
    let next_id = `box${lastInput - widths[day]}`;
    lastInput = lastInput - widths[day];

    let next_input = document.getElementById(next_id);
    let counter = 0;
    while (next_input == null) {
      counter += 1;
      num -= widths[day];
      next_id = `box${num}`;
      next_input = document.getElementById(next_id);
      lastInput = num;
      if (num < 0) {
        num = var_answer[day].length + (num % widths[day]) + widths[day];
      }
      if (counter > 100) {
        break;
      }
    }
    if (next_input) {
      next_input.focus();
    } else {
      lastInput = lastInput + widths[day];
    }
  }

  function showInstructions() {
    alert(
      "Fill in the grid with the letters in the letter bank. Horizontal and vertical areas of more than one letter must make a word, but black boxes seperate one word from another (similar to a crossword). Green letters are starting letters as hints. Additionally, any outlined areas must also make a word. Good luck!"
    );
  }

  function reset() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].value = "";
    }
    countLetters();
    subtractLetters();
    correct = false;
  }

  let autocheck = false;

  window.onload = function () {
    document.getElementById("box0").focus();
  };

  function clickDirectionSwap(id) {
    let index = boxes.findIndex((item) => item.id === id);
    if (index == lastInput) {
      if (direction === "down") {
        direction = "right";
      } else {
        direction = "down";
      }
    }
    directionSwap(id);
  }

  function directionSwap(id) {
    let index = boxes.findIndex((item) => item.id === id);
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].background = "white";
    }

    let boxes_highlight = [];

    for (let i = 0; i < var_answer[day].length; i++) {
      if (direction === "down") {
        if (i % widths[day] === index % widths[day]) {
          if (var_answer[day][i] == "null" && i < index) {
            boxes_highlight = [];
          } else if (var_answer[day][i] == "null" && i > index) {
            break;
          } else {
            boxes_highlight.push(i);
          }
        }
      } else {
        if (Math.floor(i / widths[day]) === Math.floor(index / widths[day])) {
          if (var_answer[day][i] == "null" && i < index) {
            boxes_highlight = [];
          } else if (var_answer[day][i] == "null" && i > index) {
            break;
          } else {
            boxes_highlight.push(i);
          }
        }
      }
    }

    for (let i = 0; i < boxes_highlight.length; i++) {
      boxes[boxes_highlight[i]].background = "lightblue";
    }
  }

  function hint(){
    let unshown_letters = [];
    for (let i = 0; i < boxes.length; i++){
      if (boxes[i].value == "" && var_answer[day][i] != "null" && starting_letters[i] == "null"){
        unshown_letters.push(i);
      }
    }

    let random_index = Math.floor(Math.random() * unshown_letters.length);
    starting_letters[unshown_letters[random_index]] = var_answer[day][unshown_letters[random_index]];
    checkvar_answer();
  }

  let box_width = "3vw";
  let font_size = "3vw";
  let raw_box_width = 150;
  function find_needed_width(){
    let grid_element = document.getElementById("grid-container");
    let grid_width = grid_element.offsetWidth;
    box_width = grid_width / columns;
    raw_box_width = box_width;
    box_width = box_width + "px";
  }

  setTimeout(() => {
    find_needed_width();
  }, 10);

  $: {
    if (old_columns != columns || old_rows != rows) {
      if (old_columns < columns){
        let counter = 0
        for (let i = 0; i < rows; i++) {
          boxes.splice(i*old_columns+counter+old_columns, 0, { id: `box${i}`, value: "", show: true, background: "white" });
          var_answer[day].splice(i+counter, 0, "Q");
          starting_letters.push("null");
          counter += 1;
        }
        widths[day] +=1 
      } else if (old_columns > columns){
        let counter = 0
        for (let i = 0; i < rows; i++) {
          boxes.splice(i*old_columns+counter+old_columns-1, 1);
          var_answer[day].splice(i+counter, 1);
          starting_letters.splice(i+counter, 1);
          counter -= 1;
        } 
        widths[day] -=1 
      } else if (old_rows < rows){
        for (let i = 0; i < columns; i++) {
          boxes.push({ id: `box${i}`, value: "", show: true, background: "white" });
          var_answer[day].push("Q");
          starting_letters.push("null");
        }
      } else if (old_rows > rows){
        for (let i = 0; i < columns; i++) {
          boxes.pop();
          var_answer[day].pop();
          starting_letters.pop();
        }
      }

      for (let i = 0; i<boxes.length; i++){
        boxes[i].id = `box${i}`
      }
      var_answer = var_answer
      boxes = boxes
      old_columns = columns;
      old_rows = rows;
    }
  }
</script>

<body>
  <div class="game-container">
    <h1>{title}</h1>
    <div class="button-container">
      <button on:click={reset}>Reset</button>
      {#if day != 0}
      <button on:click={showInstructions}>Instructions</button>
      <button
        on:click={() => {
          autocheck = !autocheck;
        }}
      >
        Autocheck
        <input type="checkbox" checked={autocheck} />
      </button>
      <button on:click={hint}>Hint</button>
      {:else}
      <button on:click={()=>{columns+=1}}>Add Column</button>
      <button on:click={()=>{columns-=1}}>Remove Column</button>
      <button on:click={()=>{rows+=1}}>Add Row</button>
      <button on:click={()=>{rows-=1}}>Remove Row</button>
      <!-- Columns <input type="number" bind:value={columns}/>
      Rows <input type="number" bind:value={rows}/> -->
      {/if}
    </div>
    {#if day != 0}
    <div class="letter-bank">
      <div class="letter-bank-label">Letter Bank</div>
      <div class="letter-bank-content">
        {#each letter_bank as item, i}
          {#if item.letter != "null" && item.count > 0}
            <span><strong>{item.letter}</strong><sub>{item.count}</sub></span> &nbsp;
          {/if}
        {/each}
      </div>
    </div>
    {/if}
    <div
      id="grid-container"
      style="grid-template-columns: repeat({widths[day]}, 1fr)"
    >
      {#each boxes as { id, value, show, background }, i}
        {#if show}
          {#if starting_letters[i] != "null"}
            <div
              class="grid-item"
              style="width: {box_width}; 
              height: {box_width};
              border: {words.includes(i)
                ? '2px solid black'
                : ''}; border-right: {left_word.includes(i) ||
              middle_word.includes(i)
                ? 'none'
                : right_word.includes(i) ||
                    vert_middle_word.includes(i) ||
                    bottom_word.includes(i) ||
                    top_word.includes(i)
                  ? '2px solid black'
                  : ''}; border-left: {middle_word.includes(i) ||
              right_word.includes(i)
                ? 'none'
                : left_word.includes(i) ||
                    vert_middle_word.includes(i) ||
                    bottom_word.includes(i) ||
                    top_word.includes(i)
                  ? '2px solid black'
                  : ''};
              border-top: {vert_middle_word.includes(i) ||
              bottom_word.includes(i)
                ? 'none'
                : top_word.includes(i) ||
                    middle_word.includes(i) ||
                    right_word.includes(i) ||
                    left_word.includes(i)
                  ? '2px solid black'
                  : ''}; 
              border-bottom: {vert_middle_word.includes(i) ||
              top_word.includes(i)
                ? 'none'
                : bottom_word.includes(i) ||
                    middle_word.includes(i) ||
                    right_word.includes(i) ||
                    left_word.includes(i)
                  ? '2px solid black'
                  : ''};background: {background};"
            >
              <input
                type="text"
                value={starting_letters[i]}
                disabled
                style="width: {box_width}; height: {box_width}; margin-left: {raw_box_width/-2 + "px"}; font-size: {font_size}; color: green; background: {background};"
              />
            </div>
          {:else}
            <div
              class="grid-item"
              style="width: {box_width}; 
              height: {box_width}; border: {words.includes(i)
                ? '2px solid black'
                : ''}; border-right: {left_word.includes(i) ||
              middle_word.includes(i)
                ? 'none'
                : right_word.includes(i) ||
                    vert_middle_word.includes(i) ||
                    bottom_word.includes(i) ||
                    top_word.includes(i)
                  ? '2px solid black'
                  : ''}; border-left: {middle_word.includes(i) ||
              right_word.includes(i)
                ? 'none'
                : left_word.includes(i) ||
                    vert_middle_word.includes(i) ||
                    bottom_word.includes(i) ||
                    top_word.includes(i)
                  ? '2px solid black'
                  : ''};
              border-top: {vert_middle_word.includes(i) ||
              bottom_word.includes(i)
                ? 'none'
                : top_word.includes(i) ||
                    middle_word.includes(i) ||
                    right_word.includes(i) ||
                    left_word.includes(i)
                  ? '2px solid black'
                  : ''}; 
              border-bottom: {vert_middle_word.includes(i) ||
              top_word.includes(i)
                ? 'none'
                : bottom_word.includes(i) ||
                    middle_word.includes(i) ||
                    right_word.includes(i) ||
                    left_word.includes(i)
                  ? '2px solid black'
                  : ''};background: {background};"
            >
              <input
                autocomplete="off"
                type="text"
                bind:value
                {id}
                on:click={() => {
                  clickDirectionSwap(id);
                  lastInput = i;
                }}
                on:focus={() => {
                  directionSwap(id);
                }}
                on:input={handleInput(id)}
                style="width: {box_width}; height: {box_width}; margin-left: {raw_box_width/-2 + "px"}; font-size: {font_size}; color: {value.length > 0
                  ? autocheck
                    ? value != var_answer[day][i]
                      ? 'red'
                      : 'blue'
                    : 'black'
                  : 'black'};
                  background: {background};"
              />
            </div>
          {/if}
        {:else}
          <div class="grid-item" style="background-color: black; width: {box_width}; 
              height: {box_width};">
            <input type="text" disabled style="background-color: black;" />
          </div>
        {/if}
      {/each}
    </div>
  </div>
  {#if correct}
    <div class="correct">
      You Won!
      <button
        style="scale: 0.4; background-color: white"
        on:click={() => {
          correct = false;
        }}>X</button
      >
    </div>
  {/if}
  {#if day === 0}
  <textarea class="word-bank" id="word-bank" placeholder="Words you want to use" on:change={()=>{wordbank=true}} on:focus={()=>{wordbank=true}} on:blur={()=>{wordbank=false}}></textarea>
  {/if}
  {#if day === 0}
  {/if}
  </body>


<style>

  body{
    background: white;
  }

  @media (min-width: 750px){
    body{
      scale: 0.9;
      margin-top: -3vw;
      overflow: hidden;
    }
  } 

  .game-container {
    margin-bottom: 100px;
  }

  h1 {
    margin-top: -10px;
    font-style: italic;
  }

  #grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* Create 5 columns */
    gap: 0.1vw; /* Adjust the gap between boxes */
    margin: 0 auto; /* Center the grid */
  }

  .grid-item {
    border: 1px solid #ccc;
    padding: 0.5vw;
    text-align: center;
    width: 3vw;
    height: 3vw;
  }

  input[type="text"] {
    position: absolute;
    height: 3vw;
    width: 3vw;
    border: none;
    text-align: center;
    font-size: 3vw;
    padding: 0;
    margin-left: -1.5vw;
  }

  input[type="number"] {
    width: 3vw;
  }

  .letter-bank {
    /* background-color: rgb(255, 234, 204); */
    border: 1px solid black;
    border-radius: 20px;
    margin-top: -10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .letter-bank-label{
    font-size: 20px;
    align-self: flex-start;
    background-color: rgb(204, 242, 255);
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px 20px 0px 0px;
  }

  .letter-bank-content {
    color: black;
    padding: 20px;
  }

  .word-bank {
    width: 50vw;
    height: 300px;
    margin-left: 2vw;
    display: block;
    font-size: 20px;
    overflow-x: scroll;
  }

  .correct {
    left: 20vw;
    top: 25vw;
    width: 60vw;
    height: 10vw;
    position: fixed;
    background-color: green;
    color: white;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
    font-size: 30px;
    line-height: 10vw;
  }

  button {
    background-color: rgb(224, 232, 245);
    color: black;
    margin-top: 10px;
  }

  .button-container {
    margin-top: -10px;
    margin-bottom: 20px;
  }
</style>