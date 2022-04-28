import React, { useState, useEffect } from "react";

import { Platform } from "react-native";

import { FaceRecognition } from "../presenter";

const FaceRecognitionContainer = ({
  selectedDirection,
  onSelectedDirection,
  cameraPermissionStatus,
  setCameraPermissionStatus,
}) => {
  const [isFaceCenter, setIsFaceCenter] = useState(false);
  const [isFaceFront, setIsFaceFront] = useState(false);
  const [isDirectionPreviewTextShow, setIsDirectionPreviewTextShow] =
    useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDirectionPreviewTextShow(false);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedDirection]);

  const handlerFacePosition = ({ faces }) => {
    if (!faces[0]) {
      return;
    }

    if (
      !isFaceCenter &&
      faces[0].leftEyePosition.y > 60 &&
      faces[0].leftEyePosition.y < 390
    ) {
      setIsFaceCenter(true);
    }

    if (!isFaceFront && faces[0].yawAngle > -10 && faces[0].yawAngle < 10) {
      setIsFaceFront(true);
    }

    if (isFaceCenter && isFaceFront) {
      if (faces[0].leftEyePosition.y < 40) {
        setIsFaceCenter(false);
        setIsDirectionPreviewTextShow(true);
        onSelectedDirection({ direction: "up" });
      }

      if (faces[0].leftEyePosition.y > 390) {
        setIsFaceCenter(false);
        setIsDirectionPreviewTextShow(true);
        onSelectedDirection({ direction: "down" });
      }

      if (faces[0].yawAngle < -36) {
        setIsFaceFront(false);
        setIsDirectionPreviewTextShow(true);
        Platform.OS === "ios"
          ? onSelectedDirection({ direction: "left" })
          : onSelectedDirection({ direction: "right" });
      }

      if (faces[0].yawAngle > 36) {
        setIsFaceFront(false);
        setIsDirectionPreviewTextShow(true);
        Platform.OS === "ios"
          ? onSelectedDirection({ direction: "right" })
          : onSelectedDirection({ direction: "left" });
      }
    }
  };

  return (
    <FaceRecognition
      selectedDirection={selectedDirection}
      handlerFacePosition={handlerFacePosition}
      cameraPermissionStatus={cameraPermissionStatus}
      setCameraPermissionStatus={setCameraPermissionStatus}
      isDirectionPreviewTextShow={isDirectionPreviewTextShow}
    />
  );
};

export default FaceRecognitionContainer;
