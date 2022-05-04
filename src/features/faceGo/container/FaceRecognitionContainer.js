import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Platform } from "react-native";
import uuid from "react-native-uuid";

import {
  facePosition,
  faceYawAngleRange,
  time,
} from "../../../common/constants";
import FaceRecognition from "../presenter/FaceRecognition";

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
    }, time.faceRecognitionInterval);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedDirection]);

  const handlerFacePosition = ({ faces }) => {
    const focusedFace = faces[0];

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
        onSelectedDirection({ id: uuid.v4(), direction: "up" });
      }

      if (focusedFace.leftEyePosition.y > facePosition.bottom) {
        setIsFaceCenter(false);
        setIsDirectionPreviewTextShow(true);
        onSelectedDirection({ id: uuid.v4(), direction: "down" });
      }

      if (focusedFace.yawAngle < faceYawAngleRange.left) {
        setIsFaceFront(false);
        setIsDirectionPreviewTextShow(true);
        Platform.OS === "ios"
          ? onSelectedDirection({ id: uuid.v4(), direction: "left" })
          : onSelectedDirection({ id: uuid.v4(), direction: "right" });
      }

      if (focusedFace.yawAngle > faceYawAngleRange.right) {
        setIsFaceFront(false);
        setIsDirectionPreviewTextShow(true);
        Platform.OS === "ios"
          ? onSelectedDirection({ id: uuid.v4(), direction: "right" })
          : onSelectedDirection({ id: uuid.v4(), direction: "left" });
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

FaceRecognitionContainer.propTypes = {
  selectedDirection: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.string,
  }),
  onSelectedDirection: PropTypes.func.isRequired,
  cameraPermissionStatus: PropTypes.string.isRequired,
  setCameraPermissionStatus: PropTypes.func.isRequired,
};

FaceRecognitionContainer.defaultProps = {
  selectedDirection: {},
};
