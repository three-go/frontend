import React, { useState } from "react";

import { Platform } from "react-native";

import FaceRecognition from "../presenter/FaceRecognition";

const FaceRecognitionContainer = ({ onSelectedDirection }) => {
  const [isFaceCenter, setIsFaceCenter] = useState(false);
  const [isFaceFront, setIsFaceFront] = useState(false);

  const handlerFacePosition = ({ faces }) => {
    if (!faces[0]) {
      return;
    }

    if (
      !isFaceCenter &&
      faces[0].leftEyePosition.y > 60 &&
      faces[0].leftEyePosition.y < 300
    ) {
      setIsFaceCenter(true);
    }

    if (!isFaceFront && faces[0].yawAngle > -10 && faces[0].yawAngle < 10) {
      setIsFaceFront(true);
    }

    if (isFaceCenter && isFaceFront) {
      if (faces[0].leftEyePosition.y < 80) {
        setIsFaceCenter(false);
        onSelectedDirection("위 쪽");
      }

      if (faces[0].leftEyePosition.y > 350) {
        setIsFaceCenter(false);
        onSelectedDirection("아래 쪽");
      }

      if (faces[0].yawAngle < -36) {
        setIsFaceFront(false);
        Platform.OS === "ios"
          ? onSelectedDirection("왼 쪽")
          : onSelectedDirection("오른 쪽");
      }

      if (faces[0].yawAngle > 36) {
        setIsFaceFront(false);
        Platform.OS === "ios"
          ? onSelectedDirection("오른 쪽")
          : onSelectedDirection("왼 쪽");
      }
    }
  };

  return <FaceRecognition handlerFacePosition={handlerFacePosition} />;
};

export default FaceRecognitionContainer;
