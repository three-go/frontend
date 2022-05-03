import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { Platform, Linking } from "react-native";
import RNExitApp from "react-native-exit-app";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

import { navigations } from "../../../common/constants";
import Timer from "../presenter/Timer";

const TimmerContainer = () => {
  const navigaion = useNavigation();
  const [micPermission, setMicPermission] = useState("");

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

  const handleSettingOption = async () => {
    try {
      await Linking.openSettings();
      RNExitApp.exitApp();
    } catch (error) {
      RNExitApp.exitApp();
    }
  };

  const handleSetStatusPlay = () => {
    navigaion.navigate(navigations.shoutGo);
  };

  return (
    <Timer
      micPermission={micPermission}
      onOpenSettingOption={handleSettingOption}
      onSetStatusPlay={handleSetStatusPlay}
    />
  );
};

export default TimmerContainer;
