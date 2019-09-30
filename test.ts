const board = {
  board: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P"
  ],
  board2: [
    "L",
    "I",
    "S",
    "T",
    "O",
    "F",
    "A",
    "T",
    "S",
    "T",
    "R",
    "S",
    "O",
    "R",
    "A",
    "Y"
  ]
};

// Check if the array is long enough to create an symmetric matrix
const isValidBoard = (board: string[]) =>
  Math.sqrt(board.length) % 1 === 0 && board.length > 1;

// Convert array in a matrix
const arrayToMatrix = (array: string[], matrixWidth: number): string[][] =>
  array.reduce(
    (matrix, element, i) =>
      (i % matrixWidth === 0
        ? matrix.push([element])
        : matrix[matrix.length - 1].push(element)) && matrix,
    []
  );

// Get all the neighbors related to a given position
const getNeighbors = (board: string[][], pos: { x: number; y: number }) => {
  const neighbors = [];
  for (let x = -1; x <= 1; x++) {
    if (pos.x + x < 0 || pos.x + x > board.length - 1) continue;
    const lx = pos.x + x;

    for (let y = -1; y <= 1; y++) {
      if (pos.y + y < 0 || pos.y + y > board.length - 1) continue;
      const ly = pos.y + y;

      if (!(x === 0 && y === 0) && getDisabledIdx({ x: lx, y: ly }) === -1) {
        neighbors.push({ c: board[lx][ly], x: lx, y: ly });
      }
    }
  }
  return neighbors;
};

// Already visited
const disabledPositions = [];
const getDisabledIdx = (pos: { x: number; y: number }) =>
  this.disabledPositions.findIndex(d => d.x === pos.x && d.y === pos.y);

// remove disabled
const removeDisabled = (pos: { x: number; y: number }) => {
  const idx = getDisabledIdx(pos);
  if (idx !== -1) this.disabledPositions.splice(idx, 1);
};

// Find all the different coordinates related to a given char
const getCharPositions = (board: string[][], char: string) => {
  const charPositions = [];
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      if (board[x][y] === char) {
        charPositions.push({ x, y });
      }
    }
  }
  return charPositions;
};

// Find Path
const findPath = (
  board: string[][],
  word: string,
  pos: { x: number; y: number }
) => {
  this.disabledPositions.push(pos);
  const neighbors = getNeighbors(board, pos);
  const coincidences = neighbors.filter(n => n.c === word[1]);
  let exist = false;
  for (let i = 0; i < coincidences.length && !exist; i++)
    exist = existWord(board, word.substring(1, word.length), {
      x: coincidences[i].x,
      y: coincidences[i].y
    });

  return exist;
};

const existWord = (
  board: string[][],
  word: string,
  pos?: { x: number; y: number }
) => {
  if (word.length === 1) {
    this.disabledPositions = [];
    return true;
  }
  const firstChar = word[0];
  const positions = getCharPositions(board, firstChar);

  if (!pos) {
    for (let i = 0; i < positions.length; i++) {
      if (findPath(board, word, positions[i])) {
        return true;
      } else {
        removeDisabled(positions[i]);
      }
    }
  } else if (findPath(board, word, pos)) {
    return true;
  }

  return false;
};

const checkWord = (array: string[], word: string) => {
  if (!isValidBoard(array)) return false;

  const matrixWidth = Math.sqrt(array.length);
  const matrix = arrayToMatrix(array, matrixWidth);
  return existWord(matrix, word);
};

const checkWords = () => {
  const words = [
    "ARTS",
    "FAST",
    "FIST",
    "LIST",
    "RATS",
    "SOFT",
    "SORT",
    "START",
    "SOS",
    "TOLL",
    "TOTAL"
  ];

  for (let i = 0; i < words.length; i++) {
    console.log(words[i]);
    this.disabledPositions = [];
    const res = checkWord(board.board2, words[i]);
    console.log(res);
  }
};

checkWords();
