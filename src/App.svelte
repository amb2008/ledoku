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
    hints,
    titles,
  } from "./boards.js";

  let screen_width = window.innerWidth;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let final_time = "00:00:00";
  let curr_time = "00:00:00";
  let timeRemaining = {};
  let timeRemainingString = "";

  let start = false;
  // let too_small = false;

  if (screen_width < 750) {
    alert("This game is not optimized for mobile, please use desktop.");
  }

  let wordbank = false;
  let var_answer = answer;

  let day = 3;
  let columns = 12;
  let rows = 7;
  let old_columns = columns;
  let old_rows = rows;

  let url_object = new URL(window.location.href);
  let url = url_object.href;
  let slug = url_object.pathname;
  let slug_int = parseInt(slug.slice(1));
  let title = "CleanTechies";
  let type = "";

  if (url.includes("dalton")) {
    day = 2;
    title = "Dalton";
  } else if (url.includes("sandbox")) {
    day = 0;
    title = "Sandbox";
  } else if (url.includes("cleantechies")) {
    day = 3;
    title = "CleanTechies";
    type = "CleanTechies";
  } else if (slug_int) {
    day = slug_int - 191;
    type = "CleanTechies";
    console.log(day);
    if (day == 5) {
      day = 6;
    } else if (day == 6) {
      day = 7;
    } else if (day == 7) {
      day = 5;
    }
  } else {
    timeRemaining = { hours: 0, minutes: 0, seconds: 0 };
    let intervalCount = 0;
    const fixedStartDate = new Date("2024-08-01T00:00:00");
    let currentDate = new Date();
    let start_date = new Date(fixedStartDate);
    while (start_date <= currentDate) {
      start_date.setDate(start_date.getDate() + 3);
      intervalCount++;
    }
    console.log(start_date);
    console.log(currentDate);
    intervalCount -= 1;
    day = intervalCount + 4;

    const timeDiff = start_date - currentDate;

    timeRemaining.hours = Math.floor(timeDiff / 3600000); // 3600000 ms in an hour
    timeRemaining.minutes = Math.floor((timeDiff % 3600000) / 60000); // 60000 ms in a minute
    timeRemaining.seconds = Math.floor((timeDiff % 60000) / 1000); // 1000 ms in a second
    if (day == 5) {
      day = 6;
    } else if (day == 6) {
      day = 7;
    } else if (day == 7) {
      day = 5;
    }
  }

  setInterval(() => {
    if (start) {
      seconds += 1;
      if (seconds === 60) {
        seconds = 0;
        minutes += 1;
      }
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }

      let curr_mins = minutes < 10 ? "0" + minutes : minutes;
      let curr_secs = seconds < 10 ? "0" + seconds : seconds;
      let curr_hours = hours < 10 ? "0" + hours : hours;
      curr_time = curr_hours + ":" + curr_mins + ":" + curr_secs;
    }

    if (timeRemaining.hours) {
      timeRemaining.seconds -= 1;
      if (timeRemaining.seconds < 0) {
        timeRemaining.seconds = 59;
        timeRemaining.minutes -= 1;
      }
      if (timeRemaining.minutes < 0) {
        timeRemaining.minutes = 59;
        timeRemaining.hours -= 1;
      }
      let curr_hours =
        timeRemaining.hours < 10
          ? "0" + timeRemaining.hours
          : timeRemaining.hours;
      let curr_mins =
        timeRemaining.minutes < 10
          ? "0" + timeRemaining.minutes
          : timeRemaining.minutes;
      let curr_secs =
        timeRemaining.seconds < 10
          ? "0" + timeRemaining.seconds
          : timeRemaining.seconds;

      timeRemainingString = curr_hours + ":" + curr_mins + ":" + curr_secs;
    }
  }, 1000);

  if (titles.length > day) {
    title = titles[day];
  } else {
    day = 3;
    title = "CleanTechies";
  }

  if (day == 0) {
    start = true;
    setTimeout(() => {
      const wordbank_input = document.getElementById("word-bank");
      wordbank_input.addEventListener("input", () => {
        (wordbank = true), (wordbank = wordbank);
      });
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
      index = letter_bank.findIndex(
        (item) => item.letter === var_answer[day][i]
      );
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
      } else if (boxes[i].value != "" && day != 0) {
        letter_bank.push({ letter: boxes[i].value, count: -1 });
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
      } else {
        let final_mins = minutes < 10 ? "0" + minutes : minutes;
        let final_secs = seconds < 10 ? "0" + seconds : seconds;
        let final_hours = hours < 10 ? "0" + hours : hours;
        final_time = final_hours + ":" + final_mins + ":" + final_secs;
      }
    }
    if (day === 0) {
      console.log(structure);
    }
  }
  // correct = true;

  let lastInput = 0;
  let direction = "right";

  document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && wordbank == false) {
      setTimeout(() => {
        if (direction === "right") {
          prevInput();
        } else {
          upInput();
        }
      }, 1);
    }

    if (event.key === "ArrowRight" && wordbank == false) {
      nextInput2();
    }

    if (event.key === "ArrowLeft" && wordbank == false) {
      prevInput();
    }

    if (event.key === "ArrowDown" && wordbank == false) {
      downInput();
    }

    if (event.key === "ArrowUp" && wordbank == false) {
      upInput();
    }

    if (event.key === "Enter" && wordbank == false) {
      clickDirectionSwap(`box${lastInput}`);
      document.getElementById(`box${lastInput}`).focus();
    }

    if (event.key === "Tab" && wordbank == false) {
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
  let autocheck_used = false;

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

  let hint_counter = 0;
  function hint() {
    hint_counter += 1;
    let unshown_letters = [];
    for (let i = 0; i < boxes.length; i++) {
      if (
        boxes[i].value == "" &&
        var_answer[day][i] != "null" &&
        starting_letters[i] == "null"
      ) {
        unshown_letters.push(i);
      }
    }

    let random_index = Math.floor(Math.random() * unshown_letters.length);
    starting_letters[unshown_letters[random_index]] =
      var_answer[day][unshown_letters[random_index]];
    checkvar_answer();
  }

  let box_width = "3vw";
  let font_size = "2.5vw";
  let raw_box_width = 150;
  function find_needed_width() {
    let grid_element = document.getElementById("grid-container");
    setTimeout(() => {
      let grid_width = grid_element.offsetWidth;
      raw_box_width = grid_width / widths[day];
      box_width = raw_box_width + "px";
    }, 10);
  }

  setTimeout(() => {
    find_needed_width();
  }, 10);

  $: {
    if (old_columns != columns || old_rows != rows) {
      if (old_columns < columns) {
        let counter = 0;
        for (let i = 0; i < rows; i++) {
          boxes.splice(i * old_columns + counter + old_columns, 0, {
            id: `box${i}`,
            value: "",
            show: true,
            background: "white",
          });
          var_answer[day].splice(i + counter, 0, "Q");
          starting_letters.push("null");
          counter += 1;
        }
        widths[day] += 1;
      } else if (old_columns > columns) {
        let counter = 0;
        for (let i = 0; i < rows; i++) {
          boxes.splice(i * old_columns + counter + old_columns - 1, 1);
          var_answer[day].splice(i + counter, 1);
          starting_letters.splice(i + counter, 1);
          counter -= 1;
        }
        widths[day] -= 1;
      } else if (old_rows < rows) {
        for (let i = 0; i < columns; i++) {
          boxes.push({
            id: `box${i}`,
            value: "",
            show: true,
            background: "white",
          });
          var_answer[day].push("Q");
          starting_letters.push("null");
        }
      } else if (old_rows > rows) {
        for (let i = 0; i < columns; i++) {
          boxes.pop();
          var_answer[day].pop();
          starting_letters.pop();
        }
      }

      for (let i = 0; i < boxes.length; i++) {
        boxes[i].id = `box${i}`;
      }
      var_answer = var_answer;
      boxes = boxes;
      old_columns = columns;
      old_rows = rows;
    }
  }
</script>

<body style="filter: {correct || !start ? 'blur(4px)' : ''}" id="body">
  <div class="game-container">
    <h1>{title}</h1>
    <div class="button-container">
      <button on:click={reset}>Reset</button>
      {#if day != 0}
        <button on:click={showInstructions}>Instructions</button>
        <button
          on:click={() => {
            autocheck = !autocheck;
            autocheck_used = true;
          }}
        >
          Autocheck
          <input type="checkbox" checked={autocheck} />
        </button>
        <button on:click={hint}>Hint</button>
        <button style="cursor: default; border: none">
          Time Used: {curr_time}
        </button>
      {:else}
        <button
          on:click={() => {
            columns += 1;
          }}>Add Column</button
        >
        <button
          on:click={() => {
            columns -= 1;
          }}>Remove Column</button
        >
        <button
          on:click={() => {
            rows += 1;
          }}>Add Row</button
        >
        <button
          on:click={() => {
            rows -= 1;
          }}>Remove Row</button
        >
      {/if}
    </div>
    {#if day != 0}
      <div class="letter-bank">
        <div class="letter-bank-label">Letter Bank</div>
        <div class="letter-bank-content">
          {#each letter_bank as item, i}
            {#if item.letter != "null" && item.count > 0}
              <span><strong>{item.letter}</strong><sub>{item.count}</sub></span>
              &nbsp;
            {:else if item.letter != "null" && item.count < 0}
              <span style="color: red"
                ><strong>{item.letter}</strong><sub>{item.count}</sub></span
              >
              &nbsp;
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
                style="width: {box_width}; height: {box_width}; margin-left: {raw_box_width /
                  -2 +
                  'px'}; font-size: {font_size}; color: green; background: {background};"
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
                style="width: {box_width}; height: {box_width}; margin-left: {raw_box_width /
                  -2 +
                  'px'}; font-size: {font_size}; color: {value.length > 0
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
          <div
            class="grid-item"
            style="background-color: black; width: {box_width}; 
              height: {box_width};"
          >
            <input type="text" disabled style="background-color: black;" />
          </div>
        {/if}
      {/each}
    </div>
  </div>
  {#if day === 0}
    <textarea
      class="word-bank"
      id="word-bank"
      placeholder="Words you want to use"
      on:change={() => {
        wordbank = true;
      }}
      on:focus={() => {
        wordbank = true;
      }}
      on:blur={() => {
        wordbank = false;
      }}
    ></textarea>
  {/if}
  {#if day === 0}{/if}
</body>
{#if correct}
  <div class="correct-screen"></div>
  <div class="correct">
    <button
      style="scale: 1; background-color: white; position: absolute; right: 0px; top: -10px;"
      on:click={() => {
        correct = false;
      }}>X</button
    >
    <strong class="you-won">You Won! 🎉</strong>
    <p class="win-sub">"{title}"</p>
    <p class="win-p"><strong>Time Used:</strong> {final_time}</p>
    <p class="win-p"><strong>Hints Used:</strong> {hint_counter}</p>
    <p class="win-p">
      <strong>Autocheck Used:</strong>
      {autocheck_used ? "Yes" : "No"}
    </p>
    {#if timeRemainingString.length > 0}
      <p class="win-p" style="font-size: 30px">
        <strong>Time Until Next Puzzle:</strong>
        <br />
        {timeRemainingString}
      </p>
    {/if}
    {#if (type = "CleanTechies" && day != 3)}
      {#if hint_counter < 4 && autocheck_used == false}
        <p style="font-size: 40px; margin-top: 60px; margin-bottom: -60px;">
          🎁 🎁 🎁
        </p>
        <p class="win-p">
          For your great work we have a special prize for you! You get a hint
          about who our next guest is: {hints[day]}
        </p>
      {:else}
        <p class="win-p">
          In order to get a clue as to who our next guest you can't use
          autocheck or hints, but come back next time to try again for our next
          episode!
        </p>
      {/if}
    {/if}
  </div>
{/if}
{#if !start}
  <div class="correct-screen"></div>
  <div class="correct">
    <button
      style="scale: 1; background-color: white; position: absolute; right: 0px; top: -10px;"
      on:click={() => {
        start = true;
      }}>X</button
    >
    <strong class="you-won">Ledoku</strong>
    <p class="win-sub">Today's Theme: "{title}"</p>

    <li class="start-p">
      <strong>Fill in the board using the letter bank </strong>
    </li>
    <li class="start-p">
      <strong>Every column and row must be a word</strong>
    </li>
    <li class="start-p"><strong>Any outlined area must be a word</strong></li>
    <button
      on:click={() => {
        start = true;
      }}
      style="position: relative; top: 70px; font-size: 20px; margin-bottom: 50px;"
      >Start</button
    >
  </div>
{/if}

<style>
  body {
    background: white;
  }

  @media (min-width: 750px) {
    body {
      scale: 0.9;
      margin-top: -3vw;
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

  .letter-bank-label {
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

  .correct-screen {
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: gray;
    opacity: 0.5;
  }

  .correct {
    left: 30vw;
    top: 20vh;
    width: 40vw;
    position: absolute;
    background-color: white;
    color: black;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
    font-size: 30px;
    margin-bottom: 20px;
    box-shadow: -10px 10px 90px -40px black;
    padding-bottom: 60px;
  }

  @media (max-width: 750px) {
    .correct {
      left: 10vw;
      width: 80vw;
    }
  }

  .you-won {
    position: relative;
    top: 50px;
    font-size: 44px;
  }

  .win-p {
    position: relative;
    font-size: 20px;
    top: 50px;
    width: 80%;
    left: 10%;
  }

  .start-p {
    position: relative;
    font-size: 20px;
    top: 50px;
    width: 80%;
    left: 20%;
    text-align: left;
  }

  .win-sub {
    position: relative;
    font-size: 15px;
    top: 30px;
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
