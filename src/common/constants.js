const audio = {
  timer: "timer.mp3",
  fastTimer: "timer2.mp3",
  bomb1: "bomb.mp3",
  bomb2: "bomb2.mp3",
  timeout: "timeout.mp3",
  correct1: "quiz_correct.mp3",
  correct2: "quiz_correct2.mp3",
  wrong1: "quiz_wrong.mp3",
  wrong2: "quiz_wrong2.mp3",
  open: "quiz_open.mp3",
  move1: "move1.mp3",
  move2: "move2.mp3",
  move3: "move3.mp3",
};

const iconNames = {
  heart: "heart",
  brokenHeart: "heart-broken-outline",
  leftArrow: "arrow-left-thick",
  flag: "flag",
};

const iconSizes = {
  headerChance: 28,
  headerLeftArrow: 40,
  headerFlag: 32,
  footerArrow: 50,
};

const colors = {
  black: "#000000",
  dark: "#212529",
  blueGray: "#2F455C",
  ligthGray: "#5c6977",
  gray: "#96A1A8",
  ivory: "#FCF8F6",
  white: "#ffffff",
  red: "#f45a5a",
  darkRed: "#c92a2a",
  green: "#21D0B2",
  tealGreen: "#00BBD1",
  turquoise: "#00E0EA",
  lightBlue: "#5fceec",
};

const time = {
  zero: 0,
  playInterval: 1000,
  textTimerInterval: 1000,
  faceRecognitionInterval: 800,
  readyTimerSet: 3,
  startTimerSet: 5,
  inputTimerSet: 15,
};

const textSizes = {
  small: 12,
  medium: 24,
  large: 40,
};

const navigations = {
  main: "Main",
  shoutGo: "ShoutGo",
  faceGo: "FaceGo",
  timer: "Timer",
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

const camera = {
  permissionReady: "READY",
  permissionNotAuthorized: "NOT_AUTHORIZED",
};

export {
  audio,
  camera,
  iconNames,
  iconSizes,
  navigations,
  map,
  colors,
  facePosition,
  faceYawAngleRange,
  time,
  textSizes,
};
