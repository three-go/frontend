const createInitialMap = (row, column) => {
  return Array.from(Array(row), () => new Array(column).fill(1));
};

const createWall = (map, n, row, column) => {
  const result = map.map((value) => value.slice());

  while (n > 0) {
    const r = Math.floor(Math.random() * row);
    const c = Math.floor(Math.random() * column);

    if (
      r < row &&
      c < column &&
      map[r][c] < 2 &&
      map[r][c] !== 0 &&
      !(r === 0 && c === 0)
    ) {
      result[r][c] = 0;
      map[r][c] = 0;
      n--;
    }
  }

  return result;
};

const validateMap = (map) => {
  let pass = false;
  const result = map.map((value) => value.slice());

  const walk = (row, column) => {
    if (map[row][column] == 2) {
      pass = true;
    } else if (map[row][column] == 1) {
      map[row][column] = 9;

      if (row < map.length - 1) {
        walk(row + 1, column);
      }
      if (column < map[row].length - 1) {
        walk(row, column + 1);
      }
      if (row > 0) {
        walk(row - 1, column);
      }
      if (column > 0) {
        walk(row, column - 1);
      }
    }
  };

  walk(0, 0);

  return {
    pass: pass,
    maze: result,
  };
};

const createMap = (stage) => {
  let row = 0;
  let column = 0;
  let totalWall = 0;
  let pass = false;
  let maze = null;

  if (stage === 1) {
    row = 4;
    column = 3;
    totalWall = 4;
  } else if (stage === 2) {
    row = 5;
    column = 4;
    totalWall = 6;
  } else if (stage === 3) {
    row = 6;
    column = 5;
    totalWall = 8;
  }

  while (!pass) {
    const initialMap = createInitialMap(row, column);
    initialMap[row - 1][column - 1] = 2;

    const map = createWall(initialMap, totalWall, row, column);
    const results = validateMap(map);

    pass = results.pass;
    maze = results.maze;
  }

  return maze;
};

export { createMap };
