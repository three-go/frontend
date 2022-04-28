import uuid from "react-native-uuid";

const gameNames = {
  game1: "GAME 1",
  game2: "GAME 2",
};

const gameColors = {
  game1: "#00BBD1",
  game2: "#00E0EA",
};

const game1Guide = [
  {
    title: "게임 설명",
    titleContent:
      "• 시작지점부터 종료지점까지 장애물을 피해 미로를 탈출하는 게임입니다.\n• 총 3개의 stage로 구성되어 있습니다.",
    children: [
      {
        id: uuid.v4(),
        title: "Map",
        content:
          "• 일정시간동안 맵을 기억하세요.\n• 탈출하는 최단거리를 기억하세요",
        image: require("../../public/assets/images/game1/map.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Face",
        content: "• 얼굴로 캐릭터가 움직이는 방향을 기록하세요.",
        image: require("../../public/assets/images/game1/camera.png"),
        icon: "face-recognition",
      },
      {
        id: uuid.v4(),
        title: "Play",
        content: "• 기록된 방향에 따라 캐릭터가 움직입니다.",
        image: require("../../public/assets/images/game1/play.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Next Stage",
        content: "• 캐릭터가 종료지점에 도착하면 다음 스테이지로 이동합니다.",
        image: require("../../public/assets/images/game1/next.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Fail",
        content:
          "• 캐릭터가 종료지점에 도착하지 않으면 목숨 하나가 소진된다.\n• 다시시도 또는 메인화면으로 돌아갈수 있다.",
        image: require("../../public/assets/images/game1/fail.jpg"),
      },
      {
        id: uuid.v4(),
        title: "End",
        content: "• 목숨을 모두 소진하면 게임이 종료된다.",
        image: require("../../public/assets/images/game1/end.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Success",
        content: "• 마지막 stage까지 성공하면 내 점수를 입력할 수 있습니다.",
        image: require("../../public/assets/images/game1/success.jpg"),
      },
      {
        id: uuid.v4(),
        title: "Score",
        content: "• 지금까지 플래이한 점수를 볼 수 있습니다.",
        image: require("../../public/assets/images/game1/score.jpg"),
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
          "• 위쪽: 얼굴의 눈 위치를 카메라 화면에 상단에 위치시키세요\n• 아래쪽: 얼굴의 눈 위치를 카메라 화면에 하단에 위치시키세요\n• 왼쪽: 얼굴의 고개를 왼쪽으로 돌리세요.\n• 오른쪽: 얼굴의 고개를 오른쪽으로 돌리세요.",
        image: require("../../public/assets/images/game1/camera.png"),
        icon: "face-recognition",
      },
      {
        id: uuid.v4(),
        title: "Play",
        content: "• 기록된 방향에따라 캐릭터가 자동으로 움직입니다.",
        image: require("../../public/assets/images/game1/play.jpg"),
      },
    ],
  },
];

const gameDescription = {
  game1: game1Guide,
  game2: [],
};

const gameKey = ["game1", "game2"];

const game = {
  keys: gameKey,
  names: gameNames,
  colors: gameColors,
  description: gameDescription,
};

const colors = {
  ivory: "#FCF8F6",
};

export { game, colors };
