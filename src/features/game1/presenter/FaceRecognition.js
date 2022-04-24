import React from "react";

import { StyleSheet, View, Text, Linking } from "react-native";
import { RNCamera } from "react-native-camera";
import RNExitApp from "react-native-exit-app";

import { SmallButton } from "../../../components";

const FaceRecognition = ({
  selectedDirection,
  handlerFacePosition,
  cameraPermissionStatus,
  setCameraPermissionStatus,
  isDirectionPreviewTextShow,
}) => {
  const openSettingOption = async () => {
    await Linking.openSettings();
    RNExitApp.exitApp();
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        onStatusChange={({ cameraStatus }) => {
          setCameraPermissionStatus(cameraStatus);
        }}
        captureAudio={false}
        onFacesDetected={handlerFacePosition}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        notAuthorizedView={<View />}
      />
      {cameraPermissionStatus === "NOT_AUTHORIZED" && (
        <View style={styles.notAuthorizedViewContainer}>
          <Text style={styles.notAuthorizedViewTitle}>
            권한 승인이 필요 합니다.{"\n"}
          </Text>
          <Text>
            해당 서비스를 사용하기 위해서는 카메라 권한 승인이 필요합니다. 해당
            권한을 승인하지 않으면 서비스 이용이 제한됩니다.{"\n"}
          </Text>
          <SmallButton
            content="설정으로 가기"
            color="#c92a2a"
            onPress={() => {
              openSettingOption();
            }}
          />
        </View>
      )}
      {isDirectionPreviewTextShow && selectedDirection?.direction && (
        <View style={styles.previewDirection}>
          <Text style={styles.directionText}>
            {selectedDirection?.direction.toUpperCase()}
          </Text>
        </View>
      )}
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
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#00E0EA",
  },
  directionText: {
    fontSize: 100,
  },
  notAuthorizedViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "50%",
    padding: "5%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  notAuthorizedViewTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default FaceRecognition;
