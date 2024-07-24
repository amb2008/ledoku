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

  // let screen_width = window.innerWidth;
  // let too_small = false;

  // if (screen_width < 750) {
  //   too_small = true;
  // }

  let day = 1;

  let url_object = new URL(window.location.href);
  let url = url_object.href;
  let title = "Ledoku #" + day;

  if (url.includes("cleantechies")) {
    day = 3;
    title = "CleanTechies";
  } else if (url.includes("dalton")) {
    day = 2;
    title = "Dalton";
  } else if (url.includes("sandbox")) {
    day = 0;
    title = "Sandbox";
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

  for (let i = 0; i < answer[day].length; i++) {
    if (starting_letters_ind[day].includes(i)) {
      starting_letters.push(answer[day][i]);
    } else {
      starting_letters.push("null");
    }
  }

  boxes = [];

  for (let i = 0; i < answer[day].length; i++) {
    boxes.push({ id: `box${i}`, value: "", show: true, background: "white" });
  }

  let letter_bank = [];

  function countLetters() {
    letter_bank = [];
    for (let i = 0; i < answer[day].length; i++) {
      let index = -1;
      index = letter_bank.findIndex((item) => item.letter === answer[day][i]);
      if (index != -1) {
        letter_bank[index].count += 1;
      } else {
        letter_bank.push({ letter: answer[day][i], count: 1 });
      }

      if (answer[day][i] === "null") {
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
      } else if (boxes[i].value !== "") {
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
  function checkAnswer() {
    correct = true;
    let structure = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].value == "") {
        structure.push("null");
      } else {
        structure.push(boxes[i].value);
      }
      if (
        boxes[i].value !== answer[day][i] &&
        answer[day][i] !== "null" &&
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
    if (event.key === "Backspace") {
      setTimeout(() => {
        if (direction === "right") {
          prevInput();
        } else {
          upInput();
        }
      }, 1);
    }

    if (event.key === "ArrowRight") {
      nextInput2();
    }

    if (event.key === "ArrowLeft") {
      prevInput();
    }

    if (event.key === "ArrowDown") {
      downInput();
    }

    if (event.key === "ArrowUp") {
      upInput();
    }
  });

  function handleInput(id) {
    return (event) => {
      lastInput = boxes.findIndex((item) => item.id === id);
      const value = event.target.value;
      const index = boxes.findIndex((item) => item.id === id);
      boxes[index].value = value.toUpperCase().slice(-1);

      subtractLetters();
      checkAnswer();
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
        if (num > answer[day].length) {
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
        if (num > answer[day].length) {
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
        num = answer[day].length - 1;
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
      if (num > answer[day].length) {
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
      if (num > answer[day].length) {
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
        num = answer[day].length + (num % widths[day]) + widths[day];
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

    for (let i = 0; i < answer[day].length; i++) {
      if (direction === "down") {
        if (i % widths[day] === index % widths[day]) {
          if (answer[day][i] == "null" && i < index) {
            boxes_highlight = [];
          } else if (answer[day][i] == "null" && i > index) {
            break;
          } else {
            boxes_highlight.push(i);
          }
        }
      } else {
        if (Math.floor(i / widths[day]) === Math.floor(index / widths[day])) {
          if (answer[day][i] == "null" && i < index) {
            boxes_highlight = [];
          } else if (answer[day][i] == "null" && i > index) {
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
</script>

<body>
  <div class="game-container">
    <h1>{title}</h1>
    <div class="button-container">
      <button on:click={showInstructions}>Instructions</button>
      <button on:click={reset}>Reset</button>
      <button
        on:click={() => {
          autocheck = !autocheck;
        }}
      >
        <input type="checkbox" checked={autocheck} />
        Autocheck
      </button>
    </div>
    <div class="letter-bank">
      <h2>Letter Bank</h2>
      {#each letter_bank as item, i}
        {#if item.letter != "null" && item.count > 0}
          <span><strong>{item.letter}</strong><sub>{item.count}</sub></span> &nbsp;
        {/if}
      {/each}
    </div>
    <div
      id="grid-container"
      style="grid-template-columns: repeat({widths[day]}, 1fr)"
    >
      {#each boxes as { id, value, show, background }, i}
        {#if show}
          {#if starting_letters[i] != "null"}
            <div
              class="grid-item"
              style="border: {words.includes(i)
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
                style="color: green; background: {background};"
              />
            </div>
          {:else}
            <div
              class="grid-item"
              style="border: {words.includes(i)
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
                style="color: {value.length > 0
                  ? autocheck
                    ? value != answer[day][i]
                      ? 'red'
                      : 'blue'
                    : 'black'
                  : 'black'};
                  background: {background};"
              />
            </div>
          {/if}
        {:else}
          <div class="grid-item" style="background-color: black;">
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
  </body>


<style>

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

  .letter-bank {
    background-color: rgb(255, 234, 204);
    border: 2px solid black;
    border-radius: 20px;
    margin-top: -10px;
    margin-bottom: 20px;
    padding: 20px;
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
    background-color: rgb(224, 224, 224);
  }

  .button-container {
    margin-top: -10px;
    margin-bottom: 20px;
  }
</style>