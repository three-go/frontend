import React from "react";

import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Logo = ({ size }) => (
  <Image
    source={require("../../../public/assets/logo.png")}
    style={styles.container(size)}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  container: (size) => {
    switch (size) {
      case "sm":
        return {
          width: 100,
          height: 80,
        };
      case "md":
        return {
          width: 140,
          height: 100,
        };
      case "lg":
        return {
          width: 240,
          height: 160,
        };
      default:
        return {
          width: 120,
          height: 100,
        };
    }
  },
});

export default Logo;

Logo.propTypes = {
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: "sm",
};
