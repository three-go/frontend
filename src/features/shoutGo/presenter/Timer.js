import React from "react";

import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { RESULTS } from "react-native-permissions";

import { colors } from "../../../common/constants";
import { game } from "../../../common/property";
import SmallButton from "../../../components/Buttons/SmallButton";
import TextTimer from "../../../components/Timers/TextTimer";

const Timer = ({ micPermission, onOpenSettingOption, onSetStatusPlay }) => {
  return (
    <View style={styles.container}>
      {micPermission === RESULTS.GRANTED && (
        <TextTimer onTimerEnd={onSetStatusPlay} status={game.status.none} />
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
              onOpenSettingOption();
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
    backgroundColor: colors.dark,
  },
  notAuthorizedViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    padding: "5%",
    borderRadius: 20,
    backgroundColor: colors.ivory,
  },
  notAuthorizedViewTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default Timer;

Timer.propTypes = {
  micPermission: PropTypes.string.isRequired,
  onOpenSettingOption: PropTypes.func.isRequired,
  onSetStatusPlay: PropTypes.func.isRequired,
};
