import React, { useState } from "react";

import { StyleSheet, View, Platform } from "react-native";
import { RNCamera } from "react-native-camera";

const FaceRecognition = ({ onSelectedDirection }) => {
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

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        captureAudio={false}
        onFacesDetected={handlerFacePosition}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
});

export default FaceRecognition;
