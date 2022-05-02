import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Platform, Text, Linking } from "react-native";
import RNExitApp from "react-native-exit-app";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

import { colors } from "../../../common/constants";
import SmallButton from "../../../components/Buttons/SmallButton";
import TextTimer from "../../../components/Timers/TextTimer";

const TimmerContainer = () => {
  const navigaion = useNavigation();
  const [micPermission, setMicPermission] = useState("");

  const openSettingOption = async () => {
    try {
      await Linking.openSettings();
      RNExitApp.exitApp();
    } catch (error) {
      RNExitApp.exitApp();
    }
  };

  useEffect(() => {
    if (micPermission === RESULTS.GRANTED) {
      return;
    }

    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const checkMicPermission = async () => {
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        setMicPermission(RESULTS.GRANTED);
      }

      if (result === RESULTS.BLOCKED) {
        setMicPermission(RESULTS.BLOCKED);
        return;
      }

      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);

        setMicPermission(requestResult);
        return;
      }
    };

    checkMicPermission();
  }, [micPermission]);

  const handleSetStatusPlay = () => {
    navigaion.navigate("ShoutGo");
  };

  return (
    <View style={styles.container}>
      {micPermission === RESULTS.GRANTED && (
        <TextTimer onTimerEnd={handleSetStatusPlay} status={"none"} />
      )}
      {micPermission === RESULTS.BLOCKED && (
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
            color={colors.red}
            onPress={() => {
              openSettingOption();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  notAuthorizedViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    padding: "5%",
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  notAuthorizedViewTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default TimmerContainer;
