const createInitialMap = (r, c) => {
  return Array.from(Array(r), () => Array(c).fill(1));
};

const createWall = (map, n, row, column) => {
  const record = map.slice();

  while (n > 0) {
    const r = Math.floor(Math.random() * row);
    const c = Math.floor(Math.random() * column);

    if (r < row && c < column && record[r][c] < 2 && !(r === 0 && c === 0)) {
      record[r][c] = 0;
      map[r][c] = 0;
      n--;
    }
  }

  return map;
};

const validateMap = (map) => {
  let result = false;

  const walk = (row, column) => {
    if (map[row][column] == 2) {
      result = true;
    } else if (map[row][column] == 1) {
      console.log("이동", row, column);
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

  return result;
};

const createMap = (stage) => {
  let row = 0;
  let column = 0;
  let totalWall = 0;
  let pass = false;

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

  const initialMap = createInitialMap(row, column);
  initialMap[row - 1][column - 1] = 2;

  const map = createWall(initialMap, totalWall, row, column);

  while (!pass) {
    pass = validateMap(map);
  }

  return map;
};
