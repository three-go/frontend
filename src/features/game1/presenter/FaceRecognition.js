import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { RNCamera } from "react-native-camera";

const FaceRecognition = ({ selectedDirection, handlerFacePosition }) => {
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
      <View style={styles.previewDirection}>
        <Text style={styles.text}>
          {selectedDirection.direction?.toUpperCase()}
        </Text>
      </View>
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
    overflow: "hidden",
  },
  previewDirection: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "red",
  },
  text: {
    fontSize: 100,
  },
});

export default FaceRecognition;
