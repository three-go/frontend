const iconNames = {
  heart: "heart",
  brokenHeart: "heart-broken-outline",
  leftArrow: "arrow-left-thick",
  flag: "flag",
};

const gameStatus = {
  ready: "ready",
  start: "start",
  input: "input",
  end: "end",
};

const navigations = {
  main: "Main",
};

const map = {
  width: 300,
  height: 450,
};

const facePosition = {
  top: 60,
  bottom: 390,
};

const faceYawAngleRange = {
  front: {
    low: -10,
    high: 10,
  },
  left: -36,
  right: 36,
};

export { iconNames, navigations, map, facePosition, faceYawAngleRange };
