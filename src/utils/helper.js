export const convertContentToArray = (object, keyList) => {
  const result = [];

  keyList.forEach((key) => {
    const value = object[key];

    if (value) {
      result.push(object[key]);
    } else {
      result.push([]);
    }
  });

  return result;
};

export const descendOrderScoreArray = (array) => {
  return array.sort((a, b) => {
    return b.score - a.score;
  });
};
