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
      if (faces[0].leftEyePosition.y < 40) {
        setIsFaceCenter(false);
        onSelectedDirection({ direction: "up" });
      }

      if (faces[0].leftEyePosition.y > 400) {
        setIsFaceCenter(false);
        onSelectedDirection({ direction: "down" });
      }

      if (faces[0].yawAngle < -36) {
        setIsFaceFront(false);
        Platform.OS === "ios"
          ? onSelectedDirection({ direction: "left" })
          : onSelectedDirection({ direction: "right" });
      }

      if (faces[0].yawAngle > 36) {
        setIsFaceFront(false);
        Platform.OS === "ios"
          ? onSelectedDirection({ direction: "right" })
          : onSelectedDirection({ direction: "left" });
      }
    }
  };

  return <FaceRecognition handlerFacePosition={handlerFacePosition} />;
};

export default FaceRecognitionContainer;
