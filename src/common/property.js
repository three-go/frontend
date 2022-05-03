import uuid from "react-native-uuid";

import { audio, colors } from "../common/constants";
import { getSound } from "../utils/helper";

const gameNames = {
  faceGo: "Face Go",
  shoutGo: "Shout Go",
};

const gameColors = {
  faceGo: colors.tealGreen,
  shoutGo: colors.turquoise,
};

const faceGoGuide = [
  {
    title: "게임 설명",
    titleContent:
      "• 시작지점부터 종료지점까지 장애물을 피해 미로를 탈출하는 게임입니다.\n• 총 3개의 stage로 구성되어 있습니다.\n",
    children: [
      {
        id: uuid.v4(),
        title: "Map",
        content:
          "• 일정시간동안 맵을 기억하세요.\n• 탈출하는 최단거리를 기억하세요\n",
        image: require("../../public/assets/images/faceGo/map.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Face",
        content: "• 얼굴로 캐릭터가 움직이는 방향을 기록하세요.\n",
        image: require("../../public/assets/images/faceGo/camera.png"),
        icon: "face-recognition",
      },
      {
        id: uuid.v4(),
        title: "Play",
        content: "• 기록된 방향에 따라 캐릭터가 움직입니다.\n",
        image: require("../../public/assets/images/faceGo/play.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Next Stage",
        content: "• 캐릭터가 종료지점에 도착하면 다음 스테이지로 이동합니다.\n",
        image: require("../../public/assets/images/faceGo/next.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Fail",
        content:
          "• 캐릭터가 종료지점에 도착하지 않으면 목숨 하나가 소진됩니다.\n• 다시시도 또는 메인화면으로 돌아갈수 있습니다.\n",
        image: require("../../public/assets/images/faceGo/fail.jpg"),
      },
      {
        id: uuid.v4(),
        title: "End",
        content: "• 목숨을 모두 소진하면 게임이 종료됩니다.\n",
        image: require("../../public/assets/images/faceGo/end.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Success",
        content: "• 마지막 stage까지 성공하면 내 점수를 입력할 수 있습니다.\n",
        image: require("../../public/assets/images/faceGo/success.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Score",
        content: "• 지금까지 플래이한 점수를 볼 수 있습니다.\n",
        image: require("../../public/assets/images/faceGo/score.jpg"),
      },
    ],
  },
  {
    title: "플레이 방법",
    titleContent: "• 게임 진행 방법에 대하여 알려드리겠습니다",
    children: [
      {
        id: uuid.v4(),
        title: "Face",
        content:
          "• 위쪽: 얼굴의 눈 위치를 카메라 화면에 상단에 위치시키세요\n• 아래쪽: 얼굴의 눈 위치를 카메라 화면에 하단에 위치시키세요\n• 왼쪽: 얼굴의 고개를 왼쪽으로 돌리세요.\n• 오른쪽: 얼굴의 고개를 오른쪽으로 돌리세요.\n",
        image: require("../../public/assets/images/faceGo/camera.png"),
        icon: "face-recognition",
      },
      {
        id: uuid.v4(),
        title: "Play",
        content: "• 기록된 방향에따라 캐릭터가 자동으로 움직입니다.\n",
        image: require("../../public/assets/images/faceGo/play.jpg"),
      },
    ],
  },
];

const shoutGoGuide = [
  {
    title: "게임 설명",
    titleContent: "• 여러 장애물들을 피해 바닷속을 탐험하는 게임입니다.\n",
    children: [
      {
        id: uuid.v4(),
        title: "Play",
        content: "• 여러 위치에서 나타나는 장애물들을 피하세요.\n",
        image: require("../../public/assets/images/shoutGo/map.png"),
      },
      {
        id: uuid.v4(),
        title: "Fail",
        content:
          "• 장애물과 충돌하면 기회가 한번씩 감소합니다.\n• 총 3번의 기회가 있습니다.\n",
        image: require("../../public/assets/images/shoutGo/fail.png"),
      },
      {
        id: uuid.v4(),
        title: "End",
        content:
          "• 총 3번의 기회를 소진하면 게임이 종료되며 현재까지 점수를 입력할 수 있습니다.\n",
        image: require("../../public/assets/images/shoutGo/end.png"),
      },
    ],
  },
  {
    title: "플레이 방법",
    titleContent: "• 게임 진행 방법에 대하여 알려드리겠습니다\n",
    children: [
      {
        id: uuid.v4(),
        title: "Mic",
        content:
          "• 사용자의 목소리의 크기가 커지면 캐릭터는 위로 올라갑니다.\n• 목소리의 크기가 작으면 캐릭터는 가라 앉습니다.\n",
        image: require("../../public/assets/images/shoutGo/map.png"),
      },
    ],
  },
];

const gameDescription = {
  faceGo: faceGoGuide,
  shoutGo: shoutGoGuide,
};

const gameKey = ["faceGo", "shoutGo"];

const gameStatus = {
  none: "none",
  open: "mapOpen",
  directionInput: "directionInput",
  play: "resultPlay",
};

const gameResult = {
  none: "none",
  win: "win",
  lose: "lose",
  end: "end",
};

const gameSounds = {
  timer: getSound(audio.timer),
  timeout: getSound(audio.timeout),
  wrong: getSound(audio.wrong1),
  move: getSound(audio.move3),
  lose: getSound(audio.wrong2),
  win: getSound(audio.correct2),
  end: getSound(audio.open),
};

const game = {
  keys: gameKey,
  names: gameNames,
  colors: gameColors,
  description: gameDescription,
  status: gameStatus,
  result: gameResult,
  sounds: gameSounds,
};

export { game };
