const widths = [12, 5, 15, 12, 10, 11, 9, 8]
const height = 7

const all_words = [[],[6, 7, 8, 9, 16, 17, 18, 19], [3, 4, 5, 128, 129, 130, 131, 132, 133, 134, 137, 138, 139, 90, 105, 120, 135, 150], [3, 4, 5, 6, 7, 23, 35, 47, 59, 54, 55, 56, 57, 24, 25, 26, 27], [32, 33, 34, 35, 36, 37, 38, 39, 73, 74, 75, 63, 64, 65, 4, 5, 6, 7],
[22, 33, 44, 55, 11, 12, 13, 58, 59, 60, 61, 32, 43, 54, 65, 6, 17, 28], [36, 45, 54, 64, 13, 22, 31, 40, 41, 42, 43, 47, 48],
[7, 15, 23, 31, 0, 1, 2, 3, 4, 12, 13, 14, 16, 17, 18]];
const left_words = [[],[6, 16], [3, 128, 137], [3, 54, 24], [32, 73, 63, 4], [11, 58], [41, 47], 
[0, 12, 16]];
const middle_words = [[],[7, 8, 17, 18], [4, 8, 129, 130, 131, 132, 133, 138, 139], [4, 5, 6, 55, 56, 25, 26], [33, 34, 35, 36, 37, 38, 74, 64, 5, 6],
[12, 59, 60], [42], [1, 2, 3, 13, 17]];
const right_words = [[],[9, 19], [5, 134, 140], [7, 57, 27], [39, 75, 65, 7], [13, 61], [43, 48], [4, 14, 18]];
const top_words = [[],[], [90], [23], [], [22, 32, 6], [36, 13], [7]]
const vert_middle_words = [[],[], [105, 120, 135], [35, 47], [], [33, 44, 43, 54, 17], [45, 54, 22, 31], [15, 23]]
const bottom_words = [[],[], [150], [59], [], [55, 65, 28], [63, 40], [31]]
const hints = ["", "", "", "", "He works at Elements World", "He works at Zacua Ventures", "She wrote an incredible article about how a Trump administration could affect climate investing",
]

const answer = [
  [],
  [
    "P",
    "null",
    "null",
    "S",
    "null",
    "A",
    "G",
    "E",
    "N",
    "T",
    "N",
    "null",
    "R",
    "U",
    "E",
    "I",
    "M",
    "A",
    "G",
    "E",
    "C",
    "null",
    "null",
    "null",
    "null",
    "S",
    "null",
    "null",
    "null",
    "null",
  ],
  [
    "null",
    "null",
    "S",
    "L",
    "A",
    "B",
    "null",
    "C",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "P",
    "null",
    "S",
    "null",
    "null",
    "L",
    "A",
    "N",
    "G",
    "U",
    "A",
    "G",
    "E",
    "null",
    "H",
    "O",
    "U",
    "S",
    "E",
    "null",
    "A",
    "null",
    "null",
    "null",
    "null",
    "R",
    "null",
    "null",
    "null",
    "null",
    "R",
    "null",
    "I",
    "null",
    "null",
    "S",
    "C",
    "I",
    "E",
    "N",
    "C",
    "E",
    "null",
    "H",
    "null",
    "T",
    "I",
    "G",
    "E",
    "R",
    "S",
    "null",
    "null",
    "N",
    "null",
    "H",
    "null",
    "H",
    "I",
    "D",
    "S",
    "null",
    "N",
    "null",
    "null",
    "null",
    "null",
    "null",
    "G",
    "null",
    "null",
    "null",
    "E",
    "S",
    "null",
    "null",
    "null",
    "M",
    "A",
    "T",
    "H",
    "null",
    "null",
    "L",
    "null",
    "null",
    "null",
    "L",
    "T",
    "I",
    "M",
    "B",
    "E",
    "R",
    "null",
    "I",
    "null",
    "null",
    "I",
    "null",
    "null",
    "null",
    "E",
    "O",
    "null",
    "null",
    "I",
    "N",
    "T",
    "E",
    "R",
    "S",
    "E",
    "S",
    "S",
    "I",
    "O",
    "N",
    "R",
    "O",
    "B",
    "O",
    "T",
    "S",
    "null",
    "E",
    "null",
    "null",
    "H",
    "null",
    "null",
    "null",
    "null",
    "Y",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "D",
    "T",
    "W",
    "null",
    "null",
    "null",
    "null",
    "null",
  ], ['V', 'null', 'null', 'S', 'T', 'A', 'R', 'T', 'U', 'P', 'null', 'C', 'E', 'R', 'A', 'null', 'H', 'I', 'null', 'null', 'null', 'null', 'null', 'L', 'N', 'U', 'M', 'B', 'E', 'R', 'S', 'null', 'P', 'U', 'R', 'E', 'T', 'I', 'P', 'null', 'null', 'D', 'O', 'M', 'E', 'S', 'null', 'A', 'U', 'N', 'null', 'A', 'I', 'R', 'L', 'I', 'N', 'E', 'null', 'N', 'R', 'null', 'null', 'null', 'C', 'O', 'A', 'L', 'null', 'null', 'null', 'E', 'E', 'N', 'T', 'R', 'E', 'P', 'R', 'E', 'N', 'E', 'U', 'R'],
  ['E', 'null', 'null', 'T', 'R', 'A', 'V', 'E', 'L', 'S', 'L', 'A', 'N', 'E', 'null', 'T', 'null', 'X', 'null', 'Y', 'E', 'L', 'E', 'C', 'T', 'null', 'S', 'I', 'G', 'N', 'M', 'A', 'T', 'H', 'E', 'M', 'A', 'T', 'I', 'C', 'E', 'null', 'Z', 'null', 'C', 'null', 'I', 'null', 'V', 'null', 'N', 'null', 'E', 'N', 'H', 'A', 'N', 'C', 'E', 'S', 'T', 'null', 'R', 'A', 'I', 'L', 'null', 'A', 'null', 'E', 'S', 'C', 'O', 'P', 'E', 'T', 'H', 'R', 'E', 'E'],
  ['S', 'null', 'T', 'null', 'F', 'O', 'A', 'M', 'null', 'H', 'I', 'T', 'E', 'A', 'M', 'null', 'I', 'C', 'E', 'S', 'null', 'N', 'R', 'null', 'B', 'U', 'I', 'L', 'T', 'null', 'C', 'null', 'V', 'I', 'T', 'null', 'L', 'null', 'null', 'I', 'M', 'A', 'G', 'E', 'P', 'O', 'E', 'T', 'null', 'C', 'O', 'A', 'L', 'null', 'S', 'E', 'N', 'V', 'I', 'R', 'O', 'N', 'M', 'E', 'N', 'T'],
  ['O', 'null', 'O', 'null', 'T', 'W', 'E', 'E', 'T', 'P', 'O', 'W', 'E', 'R', 'null', 'null', 'null', 'H', 'E', 'X', 'E', 'C', 'U', 'T', 'I', 'V', 'E', 'R', 'null', 'S', 'O', 'M', 'E', 'null', 'null', 'O', 'A', 'T', 'null', 'null', 'P', 'A', 'P', 'E', 'R', 'B', 'E', 'A', 'T', 'null', 'S', 'O', 'null', 'I', 'L', 'A', 'W', 'null', 'I', 'null', 'L', 'I', 'E', 'E', 'L', 'E', 'C', 'T', 'I', 'O', 'N', 'S'],
  ['E', 'L', 'E', 'C', 'T', 'R', 'I', 'C', 'null', 'O', 'N', 'null', 'H', 'A', 'T', 'H', 'L', 'O', 'G', 'G', 'E', 'D', 'null', 'A', 'O', 'null', 'I', 'O', 'N', 'null', 'null', 'R', 'T', 'E', 'N', 'S', 'null', 'null', 'null', 'G', 'null', 'V', 'E', 'H', 'I', 'C', 'L', 'E'],

];

let test_board = []
for (let i = 0; i < height*widths[0]; i++) {
  test_board.push("Q")
}

answer[0] = test_board

const starting_letters_ind = [
  [],
  [0, 3, 6, 13, 15, 16, 19, 25],
  [3, 19, 25, 32, 49, 52, 62, 65, 72, 60, 75, 85, 95, 97, 104, 107, 120, 123, 130, 137, 157],
  [0, 4, 5, 8, 9, 14, 20, 23, 25, 30, 32, 38, 41, 45, 47, 48, 49, 52, 55, 59, 64, 67, 72, 75, 81, 82],
  [10, 3, 4, 6, 9, 13, 15, 21, 22, 27, 30, 31, 34, 39, 42, 46, 50, 54, 59, 60, 62, 64, 65, 73, 75, 77],
  [0, 4, 5, 10, 12, 17, 19, 22, 24, 32, 39, 40, 42, 44, 46, 47, 49, 51, 55, 59, 61, 65, 57, 62],
  [0, 4, 6, 8, 9, 10, 12, 14, 16, 19, 20, 22, 24, 26, 29, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 58, 60, 64, 66, 68, 70],
  [0, 3, 4, 6, 8, 9, 13, 15, 18, 19, 20, 24, 29, 32, 34, 36, 41, 42, 44]
];

export {answer, starting_letters_ind, all_words, left_words, middle_words, right_words, widths, top_words, vert_middle_words, bottom_words, hints}