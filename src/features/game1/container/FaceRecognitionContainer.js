import React, { useState, useEffect } from "react";

import { Platform } from "react-native";

import { facePosition, faceYawAngleRange } from "../../../common/constants";
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
  const focusedFace = faces[0];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDirectionPreviewTextShow(false);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedDirection]);

  const handlerFacePosition = ({ faces }) => {
    if (!focusedFace) {
      return;
    }

    if (
      !isFaceCenter &&
      focusedFace.leftEyePosition.y > facePosition.top &&
      focusedFace.leftEyePosition.y < facePosition.bottom
    ) {
      setIsFaceCenter(true);
    }

    if (
      !isFaceFront &&
      focusedFace.yawAngle > faceYawAngleRange.front.low &&
      focusedFace.yawAngle < faceYawAngleRange.front.high
    ) {
      setIsFaceFront(true);
    }

    if (isFaceCenter && isFaceFront) {
      if (focusedFace.leftEyePosition.y < facePosition.top) {
        setIsFaceCenter(false);
        setIsDirectionPreviewTextShow(true);
        onSelectedDirection({ direction: "up" });
      }

      if (focusedFace.leftEyePosition.y > facePosition.bottom) {
        setIsFaceCenter(false);
        setIsDirectionPreviewTextShow(true);
        onSelectedDirection({ direction: "down" });
      }

      if (focusedFace.yawAngle < faceYawAngleRange.left) {
        setIsFaceFront(false);
        setIsDirectionPreviewTextShow(true);
        Platform.OS === "ios"
          ? onSelectedDirection({ direction: "left" })
          : onSelectedDirection({ direction: "right" });
      }

      if (focusedFace.yawAngle > faceYawAngleRange.right) {
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
